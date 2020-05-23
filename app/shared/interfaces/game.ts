export interface Game {
  id: number;
  name: string;
  developer: string;
  firstReleaseDate: Date;
  platforms: string[];
  genres: string[];
  themes: string[];
  playerPerspectives: string[];
  gameModes: string[];
  summary: string;
  cover: string;
  artworks: string[];
  screenshots: string[];
  video: string;
  website: string;
  popularity: number;
  totalRating: number;
  totalRatingCount: number;
  similarGame: number[];
}

export interface GameDbFormat {
  id: number;
  name: string;
  developer: string;
  first_release_date: Date;
  platforms: string;
  genres: string;
  themes: string;
  player_perspectives: string;
  game_modes: string;
  summary: string;
  cover: string;
  artworks: string;
  screenshots: string;
  video: string;
  website: string;
  popularity: number;
  total_rating: number;
  total_rating_count: number;
}

export interface SimilarGame {
  game: number;
  similarGame: number;
}

export interface GameApiFormat {
  id: number;
  name: string;
  involved_companies: number[];
  first_release_date: Date;
  platforms: number[];
  genres: number[];
  themes: number[];
  player_perspectives: number[];
  game_modes: number[];
  summary: string;
  cover: number;
  artworks: number[];
  screenshots: number[];
  videos: number[];
  websites: number[];
  popularity: number;
  total_rating: number;
  total_rating_count: number;
  similar_games: number[];
}
