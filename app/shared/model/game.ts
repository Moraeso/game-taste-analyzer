export interface Game {
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
  similarGame: number[] | null;
}
