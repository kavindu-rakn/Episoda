export type MediaType = 'TV' | 'Anime' | 'ONA';
export type WatchStatus = 'Watching' | 'Planning' | 'Completed';

export interface Show {
  id: string;
  title: string;
  shortTitle?: string;
  type: MediaType;
  posterUrl: string;
  totalEpisodes: number | '∞';
  seasons?: Array<{
    id: string;
    seasonNumber: number;
    title: string;
    posterUrl: string;
    totalEpisodes: number;
  }>;
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

export interface CastMember {
  id: string;
  characterName: string;
  actorName: string;
  showTitle: string;
  characterImageUrl: string;
  actorImageUrl: string;
  isVerified: boolean;
}

export interface RankingItem {
  id: string;
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
  birthday: string;
  gender: string;
  email: string;
  avatarUrl: string;
  stats: UserStats;
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
