import db from 'server/service/dbConnect';
import {
  GameDbFormat,
} from 'server/model/game';
import { Game } from 'shared/model/game';

const toConcat = (stringArray: string[]): string => stringArray.join(',');
const toSeparate = (concatString: string): string[] => concatString.split(',');

const convertGameRegularToDbFormat = (regular: Game): GameDbFormat => ({
  id: regular.id,
  name: regular.name,
  developer: regular.developer,
  first_release_date: regular.firstReleaseDate,
  platforms: regular.platforms ? toConcat(regular.platforms) : null,
  genres: regular.genres ? toConcat(regular.genres) : null,
  themes: regular.themes ? toConcat(regular.themes) : null,
  player_perspectives: regular.playerPerspectives ? toConcat(regular.playerPerspectives) : null,
  game_modes: regular.gameModes ? toConcat(regular.gameModes) : null,
  summary: regular.summary,
  cover: regular.cover,
  artworks: regular.artworks ? toConcat(regular.artworks) : null,
  screenshots: regular.screenshots ? toConcat(regular.screenshots) : null,
  video: regular.video,
  website: regular.website,
  popularity: regular.popularity,
  total_rating: regular.totalRating,
  total_rating_count: regular.totalRatingCount,
});

const convertGameDbFormatToRegular = (dbFormat: GameDbFormat): Game => ({
  id: dbFormat.id,
  name: dbFormat.name,
  developer: dbFormat.developer,
  firstReleaseDate: dbFormat.first_release_date,
  platforms: dbFormat.platforms ? toSeparate(dbFormat.platforms) : null,
  genres: dbFormat.genres ? toSeparate(dbFormat.genres) : null,
  themes: dbFormat.themes ? toSeparate(dbFormat.themes) : null,
  playerPerspectives: dbFormat.player_perspectives ? toSeparate(dbFormat.player_perspectives) : null,
  gameModes: dbFormat.game_modes ? toSeparate(dbFormat.game_modes) : null,
  summary: dbFormat.summary,
  cover: dbFormat.cover,
  artworks: dbFormat.artworks ? toSeparate(dbFormat.artworks) : null,
  screenshots: dbFormat.screenshots ? toSeparate(dbFormat.screenshots) : null,
  video: dbFormat.video,
  website: dbFormat.website,
  popularity: dbFormat.popularity,
  totalRating: dbFormat.total_rating,
  totalRatingCount: dbFormat.total_rating_count,
  similarGame: null,
});

export const getGameRegularFromDb = async (id: number): Promise<Game> => {
  const data = await db.queryPromised(`select * from game where id = ?`, [id]);
  if (data.length <= 0) {
    return null;
  }
  const game: GameDbFormat = data[0];
  return convertGameDbFormatToRegular(game);
};

export const getSimilarGameFromDb = async (id: number): Promise<number[]> => {
  const data = await db.queryPromised(`select * from similar_games where game = ?`, [id]);
  if (data.length <= 0) {
    return null;
  }
  const similarGames = [];
  data.forEach((item) => similarGames.push(item.similar_game));
  return similarGames;
};

export const insertGameIntoDb = async (regular: Game): Promise<void> => {
  const game: GameDbFormat = convertGameRegularToDbFormat(regular);
  await db.queryPromised(`insert into game
    (id, name, developer, first_release_date, platforms, genres, themes, player_perspectives, game_modes, summary,
    cover, artworks, screenshots, video, website, popularity, total_rating, total_rating_count)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [
    game.id, game.name, game.developer, game.first_release_date, game.platforms, game.genres, game.themes,
    game.player_perspectives, game.game_modes, game.summary, game.cover, game.artworks, game.screenshots, game.video,
    game.website, game.popularity, game.total_rating, game.total_rating_count,
  ]);
};

export const insertSimilarGamesIntoDb = async (game: number, similarGamesId: number[]): Promise<void> => {
  const promises = [];
  similarGamesId.forEach((similarGame) => {
    promises.push(db.queryPromised(`insert into similar_games (game, similar_game) values (?, ?)`, [game, similarGame]));
  });
  await Promise.all(promises);
};
