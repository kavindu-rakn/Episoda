import { Show, Episode, Season, CastMember } from '../types';
import {
  TVMazeShow,
  TVMazeSearchResult,
  TVMazeEpisode,
  TVMazeCastItem,
} from './apiTypes';

const TVMAZE_BASE_URL = 'https://api.tvmaze.com';
const DEFAULT_TIMEOUT_MS = 8000;

// Helper to execute fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Strips HTML tags from text strings
 */
function stripHtml(html?: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

/**
 * Maps a TVMazeShow record to Episoda's unified Show model
 */
export function tvMazeToEpisodaShow(tvShow: TVMazeShow): Show {
  const rating =
    typeof tvShow.rating?.average === 'number' && tvShow.rating.average > 0
      ? Math.round(tvShow.rating.average * 10) / 10
      : 8.3;

  const poster =
    tvShow.image?.original ||
    tvShow.image?.medium ||
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80';

  const yearString = tvShow.premiered
    ? tvShow.status === 'Running'
      ? `${tvShow.premiered.split('-')[0]} - Present`
      : tvShow.premiered.split('-')[0]
    : '2023';

  return {
    id: `tvmaze-${tvShow.id}`,
    title: tvShow.name,
    shortTitle: tvShow.name,
    type: 'TV',
    posterUrl: poster,
    backdropUrl: poster,
    totalEpisodes: 10, // Will be updated if embedded episodes are present
    rating,
    genres: tvShow.genres && tvShow.genres.length > 0 ? tvShow.genres : ['Drama', 'Crime'],
    year: yearString,
    status: tvShow.status === 'Running' ? 'Airing' : 'Completed',
    description:
      stripHtml(tvShow.summary) ||
      'A thrilling drama television series following compelling characters and intricate narratives.',
    rank: 999,
  };
}

/**
 * Search TV shows from TVMaze
 */
export async function searchTVShows(query: string): Promise<Show[]> {
  try {
    const url = `${TVMAZE_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`TVMaze search HTTP error: ${res.status}`);
    }
    const data: TVMazeSearchResult[] = await res.json();
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item) => tvMazeToEpisodaShow(item.show));
  } catch (err) {
    console.warn('[tvApi] searchTVShows failed:', err);
    return [];
  }
}

/**
 * Get popular / featured TV shows from TVMaze
 */
export async function getPopularTVShows(): Promise<Show[]> {
  try {
    const url = `${TVMAZE_BASE_URL}/shows?page=0`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`TVMaze popular shows HTTP error: ${res.status}`);
    }
    const data: TVMazeShow[] = await res.json();
    if (!Array.isArray(data)) {
      return [];
    }

    // Sort by rating average or weight and take top 20
    const sorted = data
      .filter((s) => s.rating?.average && s.image?.medium)
      .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
      .slice(0, 20);

    return sorted.map(tvMazeToEpisodaShow);
  } catch (err) {
    console.warn('[tvApi] getPopularTVShows failed:', err);
    return [];
  }
}

/**
 * Fetch detailed show metadata with embedded episodes and cast
 */
export async function getTVShowDetails(
  tvMazeId: number
): Promise<{ show: Show; seasons: Season[]; episodes: Episode[]; cast: CastMember[] } | null> {
  try {
    const url = `${TVMAZE_BASE_URL}/shows/${tvMazeId}?embed[]=episodes&embed[]=cast`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    const data: TVMazeShow = await res.json();

    const show = tvMazeToEpisodaShow(data);

    // Parse Episodes & Group by Season
    const rawEpisodes: TVMazeEpisode[] = data._embedded?.episodes || [];
    const seasonsMap = new Map<number, Episode[]>();
    const allEpisodes: Episode[] = [];

    rawEpisodes.forEach((ep) => {
      const epNumber = ep.number ?? 1;
      const episodeObj: Episode = {
        id: `tvmaze-${tvMazeId}-${ep.id}`,
        episodeNumber: epNumber,
        title: ep.name || `Episode ${epNumber}`,
        duration: ep.runtime ? `${ep.runtime}m` : '50m',
        airDate: ep.airdate,
      };

      allEpisodes.push(episodeObj);

      const seasonNum = ep.season || 1;
      if (!seasonsMap.has(seasonNum)) {
        seasonsMap.set(seasonNum, []);
      }
      seasonsMap.get(seasonNum)!.push(episodeObj);
    });

    // Build Season objects
    const seasons: Season[] = [];
    seasonsMap.forEach((eps, seasonNum) => {
      seasons.push({
        id: `season-tvmaze-${tvMazeId}-${seasonNum}`,
        seasonNumber: seasonNum,
        title: `Season ${seasonNum}`,
        posterUrl: show.posterUrl,
        totalEpisodes: eps.length,
        episodes: eps,
      });
    });

    if (seasons.length > 0) {
      show.seasons = seasons;
      show.totalEpisodes = allEpisodes.length;
    }

    // Parse Cast
    const rawCast: TVMazeCastItem[] = data._embedded?.cast || [];
    const cast: CastMember[] = rawCast.slice(0, 8).map((item) => {
      const charName = item.character.name || 'Main Cast';
      const actorName = item.person.name || 'Actor';
      const charImg =
        item.character.image?.medium ||
        item.person.image?.medium ||
        show.posterUrl;
      const actorImg =
        item.person.image?.medium ||
        item.character.image?.medium ||
        show.posterUrl;

      return {
        id: `tvmaze-cast-${tvMazeId}-${item.person.id}`,
        characterName: charName,
        actorName,
        characterImageUrl: charImg,
        actorImageUrl: actorImg,
        isVerified: true,
        showTitle: show.title,
        role: charName,
        characterBio: `${charName} is a prominent character in ${show.title}.`,
        actorBio: `${actorName} delivers an acclaimed performance as ${charName} in ${show.title}.`,
        filmography: [
          {
            id: `film-tvmaze-${tvMazeId}`,
            showTitle: show.title,
            characterName: charName,
            year: show.year || '2023',
            role: charName,
            posterUrl: show.posterUrl,
          },
        ],
      };
    });

    return { show, seasons, episodes: allEpisodes, cast };
  } catch (err) {
    console.warn('[tvApi] getTVShowDetails failed:', err);
    return null;
  }
}
