import { Show, DiscoverFilterState, DiscoverSortOption } from '../types';

export const ALL_DISCOVER_GENRES = [
  'Action',
  'Adventure',
  'Crime',
  'Dark Fantasy',
  'Drama',
  'Historical',
  'Horror',
  'Sci-Fi',
  'Shonen',
  'Thriller',
] as const;

export const SORT_OPTION_LABELS: Record<DiscoverSortOption, string> = {
  top_ranked: 'Top Ranked',
  rating_desc: 'Highest Rated',
  title_asc: 'Title (A - Z)',
  title_desc: 'Title (Z - A)',
  episodes_desc: 'Most Episodes',
  newest: 'Newest Release',
};

export const extractStartYear = (yearVal?: string | number): number => {
  if (yearVal === undefined || yearVal === null) return 0;
  if (typeof yearVal === 'number') return yearVal;
  const match = String(yearVal).match(/\b(19\d\d|20\d\d)\b/);
  return match ? parseInt(match[1], 10) : 0;
};

export const countActiveFilters = (filters: DiscoverFilterState): number => {
  let count = 0;
  if (filters.mediaType !== 'ALL') count++;
  if (filters.genre !== 'ALL') count++;
  if (filters.status !== 'ALL') count++;
  if (filters.minRating > 0) count++;
  if (filters.sortBy !== 'top_ranked') count++;
  return count;
};

export const filterAndSortShows = (
  shows: Show[],
  query: string,
  filters: DiscoverFilterState
): Show[] => {
  const trimmedQuery = query.trim().toLowerCase();

  // Filter
  const filtered = shows.filter((show) => {
    // Search Query (matches title, shortTitle, or genres)
    if (trimmedQuery) {
      const matchesTitle = show.title.toLowerCase().includes(trimmedQuery);
      const matchesShort = show.shortTitle && show.shortTitle.toLowerCase().includes(trimmedQuery);
      const matchesGenre = show.genres?.some((g) => g.toLowerCase().includes(trimmedQuery));
      if (!matchesTitle && !matchesShort && !matchesGenre) {
        return false;
      }
    }

    // Media Type
    if (filters.mediaType !== 'ALL' && show.type !== filters.mediaType) {
      return false;
    }

    // Genre
    if (filters.genre !== 'ALL') {
      const hasGenre = show.genres?.some(
        (g) => g.toLowerCase() === filters.genre.toLowerCase()
      );
      if (!hasGenre) return false;
    }

    // Status
    if (filters.status !== 'ALL') {
      if (!show.status || show.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
    }

    // Minimum Rating
    if (filters.minRating > 0) {
      if (!show.rating || show.rating < filters.minRating) {
        return false;
      }
    }

    return true;
  });

  // Sort
  return filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'rating_desc':
        return (b.rating ?? 0) - (a.rating ?? 0);
      case 'title_asc':
        return a.title.localeCompare(b.title);
      case 'title_desc':
        return b.title.localeCompare(a.title);
      case 'episodes_desc': {
        const epA = typeof a.totalEpisodes === 'number' ? a.totalEpisodes : 99999;
        const epB = typeof b.totalEpisodes === 'number' ? b.totalEpisodes : 99999;
        return epB - epA;
      }
      case 'newest':
        return extractStartYear(b.year) - extractStartYear(a.year);
      case 'top_ranked':
      default: {
        const rankA = a.rank ?? 999;
        const rankB = b.rank ?? 999;
        if (rankA !== rankB) return rankA - rankB;
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
    }
  });
};
