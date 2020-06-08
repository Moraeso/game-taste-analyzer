import {
  SimpleGameApiFormat,
  SimpleGameDbFormat,
  SimpleGame,
} from 'server/model/game';
import callGameApi from 'server/utils/callGameApi';
import db from 'server/services/dbConnect';

const convertUnixTimeStampToDate = (unixTimeStamp: any): Date => new Date(unixTimeStamp * 1000);

const getCover = async (coverId: number): Promise<string> => {
  if (!coverId) return null;
  const cover = await callGameApi('/covers', `fields image_id, width, height, url; where id=${coverId};`);
  return cover.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p'); // 1080p, 720p, cover_big, cover_small
};

const convertSimpleGameDbFormatToRegular = (dbFormat: SimpleGameDbFormat): SimpleGame => ({
  id: dbFormat.id,
  name: dbFormat.name,
  firstReleaseDate: dbFormat.first_release_date,
  cover: dbFormat.cover,
});

export const convertSimpleGameApiFormatToRegular = async (original: SimpleGameApiFormat): Promise<SimpleGame> => {
  const firstReleaseDate = convertUnixTimeStampToDate(original.first_release_date);
  const cover = await getCover(original.cover);

  return {
    id: original.id,
    name: original.name,
    firstReleaseDate,
    cover,
  };
};

const convertSimpleGameRegularToDbFormat = (regular: SimpleGame): SimpleGameDbFormat => ({
  id: regular.id,
  name: regular.name,
  first_release_date: regular.firstReleaseDate,
  cover: regular.cover,
});

export const getSimpleGameFromApi = async (id: number): Promise<SimpleGameApiFormat> => {
  const queryString = `
    fields
      id,
      name,
      first_release_date,
      cover;
    where id = ${id};
    `;
  return callGameApi('/games', queryString);
};

export const getSimpleGameRegularFromDb = async (id: number): Promise<SimpleGame> => {
  const data = await db.queryPromised(`select id, name, first_release_date, cover from game where id = ?`, [id]);
  if (data.length <= 0) {
    return null;
  }
  const game: SimpleGameDbFormat = data[0];
  return convertSimpleGameDbFormatToRegular(game);
};

export const insertSimpleGameIntoDb = async (regular: SimpleGame): Promise<void> => {
  const game: SimpleGameDbFormat = convertSimpleGameRegularToDbFormat(regular);
  await db.queryPromised(`insert into game (id, name, first_release_date, cover) values (?, ?, ?, ?)`,
    [game.id, game.name, game.first_release_date, game.cover]);
};
