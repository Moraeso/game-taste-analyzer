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
