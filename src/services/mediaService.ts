import { Show, Episode, Season, CastMember, MediaType, DEFAULT_DISCOVER_FILTERS } from '../types';
import { INITIAL_SHOWS, INITIAL_CAST_MEMBERS } from '../data/mockData';
import { searchAnime, getTopAnime, getAnimeDetails } from './animeApi';
import { searchTVShows, getPopularTVShows, getTVShowDetails } from './tvApi';
import { filterAndSortShows } from '../utils/showFilters';

// In-memory cache structures
const searchCache = new Map<string, Show[]>();
const trendingCache = new Map<string, Show[]>();
const hydratedDetailsCache = new Map<string, { show: Show; cast: CastMember[] }>();

/**
 * Normalizes query string for cache keying
 */
function getCacheKey(prefix: string, query: string, type: MediaType | 'ALL'): string {
  return `${prefix}:${type.toLowerCase()}:${query.trim().toLowerCase()}`;
}

/**
 * Searches media across Jikan and TVMaze based on selected media type
 */
export async function searchMedia(
  query: string,
  type: MediaType | 'ALL' = 'ALL'
): Promise<Show[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return getTrendingMedia(type);
  }

  const cacheKey = getCacheKey('search', trimmed, type);
  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey)!;
  }

  try {
    let results: Show[] = [];

    if (type === 'Anime' || type === 'ONA') {
      const animeResults = await searchAnime(trimmed, 25);
      results = type === 'ONA' ? animeResults.filter((s) => s.type === 'ONA') : animeResults;
    } else if (type === 'TV') {
      results = await searchTVShows(trimmed);
    } else {
      // Both Anime and TV in parallel
      const [animeRes, tvRes] = await Promise.allSettled([
        searchAnime(trimmed, 15),
        searchTVShows(trimmed),
      ]);

      const animeList = animeRes.status === 'fulfilled' ? animeRes.value : [];
      const tvList = tvRes.status === 'fulfilled' ? tvRes.value : [];

      // Interleave results
      const maxLen = Math.max(animeList.length, tvList.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < tvList.length) results.push(tvList[i]);
        if (i < animeList.length) results.push(animeList[i]);
      }
    }

    // If API returned items, cache and return
    if (results.length > 0) {
      searchCache.set(cacheKey, results);
      return results;
    }

    // Fallback to local catalog search
    return filterAndSortShows(INITIAL_SHOWS, trimmed, {
      ...DEFAULT_DISCOVER_FILTERS,
      mediaType: type,
    });
  } catch (err) {
    console.warn('[mediaService] searchMedia fallback to local:', err);
    return filterAndSortShows(INITIAL_SHOWS, trimmed, {
      ...DEFAULT_DISCOVER_FILTERS,
      mediaType: type,
    });
  }
}

/**
 * Retrieves popular/trending titles from APIs with local fallback
 */
export async function getTrendingMedia(type: MediaType | 'ALL' = 'ALL'): Promise<Show[]> {
  const cacheKey = getCacheKey('trending', 'top', type);
  if (trendingCache.has(cacheKey)) {
    return trendingCache.get(cacheKey)!;
  }

  try {
    let results: Show[] = [];

    if (type === 'Anime' || type === 'ONA') {
      const topAnime = await getTopAnime(20);
      results = type === 'ONA' ? topAnime.filter((s) => s.type === 'ONA') : topAnime;
    } else if (type === 'TV') {
      results = await getPopularTVShows();
    } else {
      const [topAnimeRes, popularTvRes] = await Promise.allSettled([
        getTopAnime(12),
        getPopularTVShows(),
      ]);

      const animeList = topAnimeRes.status === 'fulfilled' ? topAnimeRes.value : [];
      const tvList = popularTvRes.status === 'fulfilled' ? popularTvRes.value : [];

      // Interleave
      const maxLen = Math.max(animeList.length, tvList.length);
      for (let i = 0; i < maxLen; i++) {
        if (i < tvList.length) results.push(tvList[i]);
        if (i < animeList.length) results.push(animeList[i]);
      }
    }

    if (results.length > 0) {
      trendingCache.set(cacheKey, results);
      return results;
    }

    // Fallback to local mock data filtered by type
    return filterAndSortShows(INITIAL_SHOWS, '', {
      ...DEFAULT_DISCOVER_FILTERS,
      mediaType: type,
    });
  } catch (err) {
    console.warn('[mediaService] getTrendingMedia fallback to local:', err);
    return filterAndSortShows(INITIAL_SHOWS, '', {
      ...DEFAULT_DISCOVER_FILTERS,
      mediaType: type,
    });
  }
}

/**
 * Fetches complete show details (seasons, episodes, cast) for an online show
 */
export async function fetchFullShowDetails(show: Show): Promise<{ show: Show; cast: CastMember[] }> {
  // If already hydrated in cache, return immediately
  if (hydratedDetailsCache.has(show.id)) {
    return hydratedDetailsCache.get(show.id)!;
  }

  // If already has episodes/seasons (e.g. from INITIAL_SHOWS), find cast from INITIAL_CAST_MEMBERS
  if (show.seasons && show.seasons.length > 0 && (!show.id.startsWith('jikan-') && !show.id.startsWith('tvmaze-'))) {
    const localCast = INITIAL_CAST_MEMBERS.filter(
      (m) =>
        m.showTitle.toLowerCase() === show.title.toLowerCase() ||
        (show.shortTitle && m.showTitle.toLowerCase() === show.shortTitle.toLowerCase())
    );
    const result = { show, cast: localCast };
    hydratedDetailsCache.set(show.id, result);
    return result;
  }

  try {
    if (show.id.startsWith('jikan-')) {
      const malIdStr = show.id.replace('jikan-', '');
      const malId = parseInt(malIdStr, 10);
      if (!isNaN(malId)) {
        const details = await getAnimeDetails(malId);
        if (details) {
          const mergedShow: Show = {
            ...show,
            ...details.show,
            seasons: details.show.seasons,
            totalEpisodes: details.show.totalEpisodes,
          };
          const result = { show: mergedShow, cast: details.cast };
          hydratedDetailsCache.set(show.id, result);
          return result;
        }
      }
    } else if (show.id.startsWith('tvmaze-')) {
      const tvMazeIdStr = show.id.replace('tvmaze-', '');
      const tvMazeId = parseInt(tvMazeIdStr, 10);
      if (!isNaN(tvMazeId)) {
        const details = await getTVShowDetails(tvMazeId);
        if (details) {
          const mergedShow: Show = {
            ...show,
            ...details.show,
            seasons: details.seasons,
            totalEpisodes: details.show.totalEpisodes,
          };
          const result = { show: mergedShow, cast: details.cast };
          hydratedDetailsCache.set(show.id, result);
          return result;
        }
      }
    }
  } catch (err) {
    console.warn('[mediaService] fetchFullShowDetails failed:', err);
  }

  // Fallback: Return original show with empty or mock cast
  const fallbackResult = { show, cast: [] };
  hydratedDetailsCache.set(show.id, fallbackResult);
  return fallbackResult;
}

/**
 * Retrieves cast members for a given show (either from hydration cache or local mock)
 */
export function getShowCast(show: Show): CastMember[] {
  if (hydratedDetailsCache.has(show.id)) {
    const cached = hydratedDetailsCache.get(show.id);
    if (cached && cached.cast.length > 0) {
      return cached.cast;
    }
  }

  const titleLower = show.title.toLowerCase();
  const shortLower = show.shortTitle?.toLowerCase();
  return INITIAL_CAST_MEMBERS.filter(
    (m) =>
      m.showTitle.toLowerCase() === titleLower ||
      (shortLower && m.showTitle.toLowerCase() === shortLower) ||
      titleLower.includes(m.showTitle.toLowerCase()) ||
      m.showTitle.toLowerCase().includes(titleLower)
  );
}

/**
 * Clears memory caches (useful on refresh or logout)
 */
export function clearMediaCache(): void {
  searchCache.clear();
  trendingCache.clear();
  hydratedDetailsCache.clear();
}
