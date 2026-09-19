export type MediaType = 'TV' | 'Anime' | 'ONA';
export type WatchStatus = 'Watching' | 'Planning' | 'Completed';

export interface EpisodeItem {
  id: string;
  episodeNumber: number;
  title: string;
  duration?: string;
  airDate?: string;
  synopsis?: string;
}

export interface SeasonInfo {
  id: string;
  seasonNumber: number;
  title: string;
  posterUrl: string;
  totalEpisodes: number;
  episodes?: EpisodeItem[];
}

export type Episode = EpisodeItem;
export type Season = SeasonInfo;

export interface Show {
  id: string;
  title: string;
  shortTitle?: string;
  type: MediaType;
  posterUrl: string;
  backdropUrl?: string;
  totalEpisodes: number | '∞';
  seasons?: SeasonInfo[];
  episodes?: EpisodeItem[];
  genres?: string[];
  year?: number | string;
  status?: string;
  rating?: number;
  rank?: number;
  description?: string;
}


export interface WatchlistItem {
  id: string;
  showId: string;
  title: string;
  type: MediaType;
  posterUrl: string;
  watchedEpisodes: number;
  totalEpisodes: number | '∞';
  status: WatchStatus;
  lastUpdated: string;
}

export interface FilmographyItem {
  id: string;
  showTitle: string;
  characterName: string;
  roleType?: string;
  year?: string | number;
  posterUrl?: string;
}

export interface CastMember {
  id: string;
  characterName: string;
  actorName: string;
  showTitle: string;
  characterImageUrl: string;
  actorImageUrl: string;
  isVerified: boolean;
  role?: string;
  nationality?: string;
  birthDate?: string;
  actorBio?: string;
  characterBio?: string;
  filmography?: FilmographyItem[];
}

export interface RankingItem {
  id: string;
  showId?: string;
  rank: number;
  title: string;
  shortTitle: string;
  type: MediaType;
  posterUrl: string;
}


export interface UserStats {
  animeCount: number;
  animeHours: number;
  animeEpisodes: number;
  tvCount: number;
  tvHours: number;
  tvEpisodes: number;
  totalCount: number;
  totalHours: number;
  totalEpisodes: number;
}

export interface UserProfile {
  name: string;
  handle?: string;
  bio?: string;
  joinDate?: string;
  birthday: string;
  gender: string;
  email: string;
  avatarUrl: string;
  stats: UserStats;
}

export type StreamingRegion = 'Global' | 'North America' | 'Japan' | 'Europe';

export interface AppSettings {
  hapticsEnabled: boolean;
  streamingRegion: StreamingRegion;
  autoNextEpisode: boolean;
}

export interface AvatarPreset {
  id: string;
  name: string;
  url: string;
  category: string;
}

export interface MilestoneBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  requiredType: 'episodes' | 'hours' | 'shows' | 'anime' | 'completed';
  targetValue: number;
}

export interface NotificationItem {
  id: string;
  episodeNumber: number;
  showTitle: string;
  posterUrl: string;
  timeAgo: string;
  timestamp: string;
  isRead: boolean;
}

export type TabRoute = 'home' | 'watchlist' | 'discover' | 'cast' | 'ranking';
export type OverlayScreen = null | 'profile' | 'notifications' | 'onboarding' | 'auth';

export type DiscoverSortOption = 
  | 'top_ranked' 
  | 'rating_desc' 
  | 'title_asc' 
  | 'title_desc' 
  | 'episodes_desc' 
  | 'newest';

export interface DiscoverFilterState {
  mediaType: MediaType | 'ALL';
  genre: string | 'ALL';
  status: 'ALL' | 'Airing' | 'Completed';
  minRating: number;
  sortBy: DiscoverSortOption;
}

export const DEFAULT_DISCOVER_FILTERS: DiscoverFilterState = {
  mediaType: 'ALL',
  genre: 'ALL',
  status: 'ALL',
  minRating: 0,
  sortBy: 'top_ranked',
};

