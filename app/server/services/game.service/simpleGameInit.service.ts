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

const convertSimpleGameDbFormatToRegular = (g: SimpleGameDbFormat): SimpleGame => ({
  id: g.id,
  name: g.name,
  firstReleaseDate: g.first_release_date,
  cover: g.cover,
});

export const convertSimpleGameApiFormatToRegular = async (g: SimpleGameApiFormat): Promise<SimpleGame> => {
  const firstReleaseDate = convertUnixTimeStampToDate(g.first_release_date);
  const cover = await getCover(g.cover);

  return {
    id: g.id,
    name: g.name,
    firstReleaseDate,
    cover,
  };
};

const convertSimpleGameRegularToDbFormat = (g: SimpleGame): SimpleGameDbFormat => ({
  id: g.id,
  name: g.name,
  first_release_date: g.firstReleaseDate,
  cover: g.cover,
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
  const g: SimpleGameDbFormat = convertSimpleGameRegularToDbFormat(regular);
  await db.queryPromised(`insert into game (id, name, first_release_date, cover) values (?, ?, ?, ?)`,
    [g.id, g.name, g.first_release_date, g.cover]);
};
