import { MediaType } from '../types';

// ==========================================
// Jikan (MyAnimeList) API Types
// ==========================================

export interface JikanImageFormats {
  image_url: string;
  small_image_url?: string;
  large_image_url?: string;
}

export interface JikanImages {
  jpg: JikanImageFormats;
  webp?: JikanImageFormats;
}

export interface JikanGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface JikanAnime {
  mal_id: number;
  url: string;
  images: JikanImages;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  type?: string; // 'TV', 'Movie', 'OVA', 'Special', 'ONA', 'Music'
  episodes?: number | null;
  status?: string; // 'Finished Airing', 'Currently Airing', 'Not yet aired'
  airing: boolean;
  score?: number | null;
  scored_by?: number | null;
  rank?: number | null;
  popularity?: number | null;
  synopsis?: string | null;
  background?: string | null;
  season?: string | null;
  year?: number | null;
  genres: JikanGenre[];
  explicit_genres?: JikanGenre[];
  themes?: JikanGenre[];
  demographics?: JikanGenre[];
}

export interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface JikanSearchResponse {
  pagination: JikanPagination;
  data: JikanAnime[];
}

export interface JikanEpisodeItem {
  mal_id: number;
  url?: string;
  title: string;
  title_japanese?: string | null;
  title_romanji?: string | null;
  aired?: string | null;
  score?: number | null;
  filler: boolean;
  recap: boolean;
  forum_url?: string | null;
}

export interface JikanEpisodesResponse {
  pagination: JikanPagination;
  data: JikanEpisodeItem[];
}

export interface JikanCharacterVoiceActor {
  person: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  language: string;
}

export interface JikanCharacterItem {
  character: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    name: string;
  };
  role: string; // 'Main' | 'Supporting'
  voice_actors?: JikanCharacterVoiceActor[];
}

export interface JikanCharactersResponse {
  data: JikanCharacterItem[];
}

// ==========================================
// TVMaze API Types
// ==========================================

export interface TVMazeImage {
  medium: string;
  original: string;
}

export interface TVMazeRating {
  average?: number | null;
}

export interface TVMazeNetwork {
  id: number;
  name: string;
  country?: {
    name: string;
    code: string;
    timezone: string;
  } | null;
}

export interface TVMazeShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string; // 'Running', 'Ended', 'To Be Determined', 'In Development'
  runtime?: number | null;
  averageRuntime?: number | null;
  premiered?: string | null;
  ended?: string | null;
  officialSite?: string | null;
  schedule?: {
    time: string;
    days: string[];
  };
  rating?: TVMazeRating;
  weight: number;
  network?: TVMazeNetwork | null;
  webChannel?: TVMazeNetwork | null;
  image?: TVMazeImage | null;
  summary?: string | null;
  updated: number;
  _embedded?: {
    episodes?: TVMazeEpisode[];
    cast?: TVMazeCastItem[];
  };
}

export interface TVMazeSearchResult {
  score: number;
  show: TVMazeShow;
}

export interface TVMazeEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number | null;
  type: string;
  airdate?: string;
  airtime?: string;
  airstamp?: string;
  runtime?: number | null;
  rating?: TVMazeRating;
  image?: TVMazeImage | null;
  summary?: string | null;
}

export interface TVMazePerson {
  id: number;
  url: string;
  name: string;
  country?: {
    name: string;
    code: string;
  } | null;
  birthday?: string | null;
  deathday?: string | null;
  gender?: string | null;
  image?: TVMazeImage | null;
}

export interface TVMazeCharacter {
  id: number;
  url: string;
  name: string;
  image?: TVMazeImage | null;
}

export interface TVMazeCastItem {
  person: TVMazePerson;
  character: TVMazeCharacter;
  self: boolean;
  voice: boolean;
}
