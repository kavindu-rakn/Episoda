import { Show, Episode, Season, CastMember, MediaType } from '../types';
import {
  JikanAnime,
  JikanSearchResponse,
  JikanEpisodesResponse,
  JikanCharactersResponse,
} from './apiTypes';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';
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
 * Maps a JikanAnime record to Episoda's unified Show model
 */
export function jikanToEpisodaShow(anime: JikanAnime): Show {
  const isONA = anime.type?.toUpperCase() === 'ONA';
  const mediaType: MediaType = isONA ? 'ONA' : 'Anime';

  const genres = [
    ...(anime.genres || []).map((g) => g.name),
    ...(anime.themes || []).map((t) => t.name),
  ];

  // Remove duplicates while maintaining order
  const uniqueGenres = Array.from(new Set(genres));

  const rating =
    typeof anime.score === 'number' && anime.score > 0
      ? Math.round(anime.score * 10) / 10
      : 8.2;

  const totalEpisodes =
    typeof anime.episodes === 'number' && anime.episodes > 0 ? anime.episodes : 12;

  const yearString = anime.year
    ? String(anime.year)
    : anime.status === 'Currently Airing'
    ? '2024 - Present'
    : '2023';

  const poster =
    anime.images.jpg.large_image_url ||
    anime.images.jpg.image_url ||
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80';

  return {
    id: `jikan-${anime.mal_id}`,
    title: anime.title,
    shortTitle: anime.title_english || anime.title,
    type: mediaType,
    posterUrl: poster,
    backdropUrl: poster,
    totalEpisodes,
    rating,
    genres: uniqueGenres.length > 0 ? uniqueGenres : ['Action', 'Fantasy'],
    year: yearString,
    status: anime.airing ? 'Airing' : 'Completed',
    description: anime.synopsis?.replace(/\[Written by MAL Rewrite\]/g, '').trim() ||
      'No synopsis provided for this anime series.',
    rank: anime.rank || anime.popularity || 999,
  };
}

/**
 * Search anime from Jikan v4
 */
export async function searchAnime(query: string, limit: number = 20): Promise<Show[]> {
  try {
    const url = `${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(
      query
    )}&limit=${limit}&sfw=true`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Jikan search HTTP error: ${res.status}`);
    }
    const data: JikanSearchResponse = await res.json();
    if (!data || !Array.isArray(data.data)) {
      return [];
    }
    return data.data.map(jikanToEpisodaShow);
  } catch (err) {
    console.warn('[animeApi] searchAnime failed:', err);
    return [];
  }
}

/**
 * Get top / popular anime from Jikan v4
 */
export async function getTopAnime(limit: number = 20): Promise<Show[]> {
  try {
    const url = `${JIKAN_BASE_URL}/top/anime?filter=bypopularity&limit=${limit}&sfw=true`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) {
      throw new Error(`Jikan top anime HTTP error: ${res.status}`);
    }
    const data: JikanSearchResponse = await res.json();
    if (!data || !Array.isArray(data.data)) {
      return [];
    }
    return data.data.map(jikanToEpisodaShow);
  } catch (err) {
    console.warn('[animeApi] getTopAnime failed:', err);
    return [];
  }
}

/**
 * Fetch detailed anime metadata including episodes and character cast
 */
export async function getAnimeDetails(
  malId: number
): Promise<{ show: Show; episodes: Episode[]; cast: CastMember[] } | null> {
  try {
    // 1. Fetch full details
    const fullRes = await fetchWithTimeout(`${JIKAN_BASE_URL}/anime/${malId}/full`);
    if (!fullRes.ok) return null;
    const fullData = await fullRes.json();
    const show = jikanToEpisodaShow(fullData.data);

    // 2. Fetch episodes
    let episodes: Episode[] = [];
    try {
      const epRes = await fetchWithTimeout(`${JIKAN_BASE_URL}/anime/${malId}/episodes`);
      if (epRes.ok) {
        const epData: JikanEpisodesResponse = await epRes.json();
        if (Array.isArray(epData.data) && epData.data.length > 0) {
          episodes = epData.data.map((item) => ({
            id: `jikan-${malId}-${item.mal_id}`,
            episodeNumber: item.mal_id,
            title: item.title || `Episode ${item.mal_id}`,
            duration: '24m',
            airDate: item.aired ? item.aired.split('T')[0] : undefined,
          }));
        }
      }
    } catch {
      // Non-blocking: fallback to generated episode list below
    }

    // Fallback if episodes array was empty: generate from totalEpisodes
    if (episodes.length === 0 && typeof show.totalEpisodes === 'number') {
      const count = Math.min(show.totalEpisodes, 24);
      for (let i = 1; i <= count; i++) {
        episodes.push({
          id: `jikan-${malId}-${i}`,
          episodeNumber: i,
          title: `Episode ${i}`,
          duration: '24m',
        });
      }
    }

    // Wrap episodes in Season 1
    const season: Season = {
      id: `season-jikan-${malId}-1`,
      seasonNumber: 1,
      title: 'Season 1',
      posterUrl: show.posterUrl,
      totalEpisodes: episodes.length,
      episodes,
    };
    show.seasons = [season];
    show.totalEpisodes = episodes.length;

    // 3. Fetch character cast
    let cast: CastMember[] = [];
    try {
      const charRes = await fetchWithTimeout(`${JIKAN_BASE_URL}/anime/${malId}/characters`);
      if (charRes.ok) {
        const charData: JikanCharactersResponse = await charRes.json();
        if (Array.isArray(charData.data)) {
          // Take top 6 characters
          cast = charData.data.slice(0, 6).map((item) => {
            const va = item.voice_actors && item.voice_actors.length > 0
              ? item.voice_actors[0]
              : null;

            const actorName = va ? va.person.name : item.character.name;
            const actorImage = va
              ? va.person.images.jpg.image_url
              : item.character.images.jpg.image_url;

            return {
              id: `jikan-cast-${malId}-${item.character.mal_id}`,
              characterName: item.character.name,
              actorName,
              characterImageUrl: item.character.images.jpg.image_url,
              actorImageUrl: actorImage,
              isVerified: true,
              showTitle: show.title,
              role: item.role === 'Main' ? 'Lead Protagonist' : 'Supporting Role',
              characterBio: `${item.character.name} is a key character appearing in ${show.title}. Known for their distinctive role and impact across the story.`,
              actorBio: `${actorName} is a voice artist who brings ${item.character.name} to life in the ${show.title} animated production.`,
              filmography: [
                {
                  id: `jikan-${malId}`,
                  showTitle: show.title,
                  characterName: item.character.name,
                  year: show.year || '2023',
                  role: item.role,
                  posterUrl: show.posterUrl,
                },
              ],
            };
          });
        }
      }
    } catch {
      // Non-blocking
    }

    return { show, episodes, cast };
  } catch (err) {
    console.warn('[animeApi] getAnimeDetails failed:', err);
    return null;
  }
}
