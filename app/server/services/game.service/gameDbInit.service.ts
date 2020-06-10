import db from 'server/services/dbConnect';
import {
  Game,
  GameDbFormat,
} from 'server/model/game';
import {
  ONLY_SIMPLE_GAME_DATA,
  NO_GAME_DATA,
} from 'server/constants';

const toConcat = (stringArray: string[]): string => stringArray.join(',');
const toSeparate = (concatString: string): string[] => concatString.split(',');

const convertGameRegularToDbFormat = (g: Game): GameDbFormat => ({
  id: g.id,
  name: g.name,
  developer: g.developer,
  first_release_date: g.firstReleaseDate,
  platforms: g.platforms ? toConcat(g.platforms) : null,
  genres: g.genres ? toConcat(g.genres) : null,
  themes: g.themes ? toConcat(g.themes) : null,
  player_perspectives: g.playerPerspectives ? toConcat(g.playerPerspectives) : null,
  game_modes: g.gameModes ? toConcat(g.gameModes) : null,
  summary: g.summary,
  cover: g.cover,
  artworks: g.artworks ? toConcat(g.artworks) : null,
  screenshots: g.screenshots ? toConcat(g.screenshots) : null,
  video: g.video,
  website: g.website,
  popularity: g.popularity,
  total_rating: g.totalRating,
  total_rating_count: g.totalRatingCount,
});

const convertGameDbFormatToRegular = (g: GameDbFormat): Game => ({
  id: g.id,
  name: g.name,
  developer: g.developer,
  firstReleaseDate: g.first_release_date,
  platforms: g.platforms ? toSeparate(g.platforms) : null,
  genres: g.genres ? toSeparate(g.genres) : null,
  themes: g.themes ? toSeparate(g.themes) : null,
  playerPerspectives: g.player_perspectives ? toSeparate(g.player_perspectives) : null,
  gameModes: g.game_modes ? toSeparate(g.game_modes) : null,
  summary: g.summary,
  cover: g.cover,
  artworks: g.artworks ? toSeparate(g.artworks) : null,
  screenshots: g.screenshots ? toSeparate(g.screenshots) : null,
  video: g.video,
  website: g.website,
  popularity: g.popularity,
  totalRating: g.total_rating,
  totalRatingCount: g.total_rating_count,
  similarGames: null,
});

export const getGameRegularFromDb = async (id: number): Promise<Game | number> => {
  const data = await db.queryPromised(`select * from game where id = ?`, [id]);
  if (data.length <= 0) {
    return NO_GAME_DATA;
  }
  if (!data[0].developer && !data[0].platforms) {
    return ONLY_SIMPLE_GAME_DATA;
  }
  const game: GameDbFormat = data[0];
  return convertGameDbFormatToRegular(game);
};

export const getSimilarGamesFromDb = async (id: number): Promise<number[]> => {
  const data = await db.queryPromised(`select * from similar_games where game = ?`, [id]);
  if (data.length <= 0) {
    return null;
  }
  const similarGames = [];
  data.forEach((item) => similarGames.push(item.similar_game));
  return similarGames;
};

export const insertGameIntoDb = async (regular: Game): Promise<void> => {
  const g: GameDbFormat = convertGameRegularToDbFormat(regular);
  const query = `insert into game (id, name, developer, first_release_date, platforms, genres, themes, player_perspectives,
    game_modes, summary, cover, artworks, screenshots, video, website, popularity, total_rating, total_rating_count)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await db.queryPromised(query,
    [
      g.id, g.name, g.developer, g.first_release_date, g.platforms, g.genres, g.themes,
      g.player_perspectives, g.game_modes, g.summary, g.cover, g.artworks, g.screenshots, g.video,
      g.website, g.popularity, g.total_rating, g.total_rating_count,
    ]);
};

export const updateGameDb = async (regular: Game): Promise<void> => {
  const g: GameDbFormat = convertGameRegularToDbFormat(regular);
  const query = `update game set name = ?, developer = ?, first_release_date = ?, platforms = ?, genres = ?,
  themes = ?, player_perspectives = ?, game_modes = ?, summary = ?, cover = ?, artworks = ?, screenshots = ?, video = ?,
    website = ?, popularity = ?, total_rating = ?, total_rating_count = ? where id = ${g.id}`;
  await db.queryPromised(query,
    [
      g.name, g.developer, g.first_release_date, g.platforms, g.genres, g.themes,
      g.player_perspectives, g.game_modes, g.summary, g.cover, g.artworks, g.screenshots, g.video,
      g.website, g.popularity, g.total_rating, g.total_rating_count,
      g.website, g.popularity, g.total_rating, g.total_rating_count,
    ]);
};

export const insertSimilarGamesIntoDb = async (game: number, similarGamesId: number[]): Promise<void> => {
  const promises = [];
  similarGamesId.forEach((similarGame) => {
    promises.push(db.queryPromised(`insert into similar_games (game, similar_game) values (?, ?)`, [game, similarGame]));
  });
  await Promise.all(promises);
};
