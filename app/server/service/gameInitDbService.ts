import db from 'server/service/dbConnect';
import {
  Game,
  GameDbFormat,
} from 'shared/interfaces/game';

const toConcat = (stringArray: string[]) => stringArray.join(',');
const toSeparate = (concatString: string) => concatString.split(',');

const convertGameRegularToDbFormat = (regular: Game) => {
  const game: GameDbFormat = {
    id: regular.id,
    name: regular.name,
    developer: regular.developer,
    first_release_date: regular.firstReleaseDate,
    platforms: toConcat(regular.platforms),
    genres: toConcat(regular.genres),
    themes: toConcat(regular.themes),
    player_perspectives: toConcat(regular.playerPerspectives),
    game_modes: toConcat(regular.gameModes),
    summary: regular.summary,
    cover: regular.cover,
    artworks: toConcat(regular.artworks),
    screenshots: toConcat(regular.screenshots),
    video: regular.video,
    website: regular.website,
    popularity: regular.popularity,
    total_rating: regular.totalRating,
    total_rating_count: regular.totalRatingCount,
  };
  return game;
};

const convertGameDbFormatToRegular = (dbFormat: GameDbFormat) => {
  const game: Game = {
    id: dbFormat.id,
    name: dbFormat.name,
    developer: dbFormat.developer,
    firstReleaseDate: dbFormat.first_release_date,
    platforms: toSeparate(dbFormat.platforms),
    genres: toSeparate(dbFormat.genres),
    themes: toSeparate(dbFormat.themes),
    playerPerspectives: toSeparate(dbFormat.player_perspectives),
    gameModes: toSeparate(dbFormat.game_modes),
    summary: dbFormat.summary,
    cover: dbFormat.cover,
    artworks: toSeparate(dbFormat.artworks),
    screenshots: toSeparate(dbFormat.screenshots),
    video: dbFormat.video,
    website: dbFormat.website,
    popularity: dbFormat.popularity,
    totalRating: dbFormat.total_rating,
    totalRatingCount: dbFormat.total_rating_count,
    similarGame: null,
  };
  return game;
};

export const getGameRegularFromDb = async (id: number) => {
  const data = await db.queryPromised(`select * from game where id = ?`, [id]);
  if (data.length <= 0) {
    return null;
  }
  const game: GameDbFormat = data[0];
  return convertGameDbFormatToRegular(game);
};

export const getSimilarGameFromDb = async (id: number) => {
  const data = await db.queryPromised(`select * from similar_games where game = ?`, [id]);
  if (data.length <= 0) {
    return null;
  }
  const similarGames = [];
  data.forEach((item) => similarGames.push(item.similar_game));
  return similarGames;
};

export const insertGameIntoDb = async (regular: Game) => {
  const game: GameDbFormat = convertGameRegularToDbFormat(regular);
  await db.queryPromised(`insert into game
    (id, name, developer, first_release_date, platforms, genres, themes, player_perspectives, game_modes, summary,
    cover, artworks, screenshots, video, website, popularity, total_rating, total_rating_count)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [game.id, game.name, game.developer, game.first_release_date, game.platforms, game.genres, game.themes,
    game.player_perspectives, game.game_modes, game.summary, game.cover, game.artworks, game.screenshots, game.video,
    game.website, game.popularity, game.total_rating, game.total_rating_count]);
};

export const insertSimilarGamesIntoDb = async (game: number, similarGamesId: number[]) => {
  const promises = [];
  similarGamesId.forEach((similarGame) => {
    promises.push(db.queryPromised(`insert into similar_games (game, similar_game) values (?, ?)`, [game, similarGame]));
  });
  await Promise.all(promises);
};
