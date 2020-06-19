export interface __game {
  id: number | null;
  name: string | null;
  developer: string | null;
  firstReleaseDate: Date | null;
  platforms: string[] | null;
  genres: string[] | null;
  themes: string[] | null;
  playerPerspectives: string[];
  gameModes: string[] | null;
  summary: string | null;
  cover: string | null;
  artworks: string[] | null;
  screenshots: string[] | null;
  video: string | null;
  website: string | null;
  popularity: number | null;
  totalRating: number | null;
  totalRatingCount: number | null;
  similarGames: number[] | null;
}

export interface SimpleGame {
  id: number | null;
  name: string | null;
  firstReleaseDate: Date | null;
  cover: string | null;
}

export interface GameDbFormat {
  id: number | null;
  name: string | null;
  developer: string | null;
  first_release_date: Date | null;
  platforms: string | null;
  genres: string | null;
  themes: string | null;
  player_perspectives: string | null;
  game_modes: string | null;
  summary: string | null;
  cover: string | null;
  artworks: string | null;
  screenshots: string | null;
  video: string | null;
  website: string | null;
  popularity: number | null;
  total_rating: number | null;
  total_rating_count: number | null;
}

export interface GameApiFormat {
  id: number | null;
  name: string | null;
  involved_companies: number[] | null;
  first_release_date: Date | null;
  platforms: number[] | null;
  genres: number[] | null;
  themes: number[] | null;
  player_perspectives: number[] | null;
  game_modes: number[] | null;
  summary: string | null;
  cover: number | null;
  artworks: number[] | null;
  screenshots: number[] | null;
  videos: number[] | null;
  websites: number[] | null;
  popularity: number | null;
  total_rating: number | null;
  total_rating_count: number | null;
  similar_games: number[] | null;
}

export interface SimpleGameApiFormat {
  id: number | null;
  name: string | null;
  first_release_date: Date | null;
  cover: number | null;
}

export interface SimpleGameDbFormat {
  id: number | null;
  name: string | null;
  first_release_date: Date | null;
  cover: string | null;
}
