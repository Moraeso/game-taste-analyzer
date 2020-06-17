import db from 'server/services/dbConnect';
import {
  Game,
  GameDbFormat,
} from 'server/model/game';
import { convertGameDbFormatToRegular } from 'server/services/game.service/gameDbInit.service';

export const getGamesOrderByRating = async (ordering, limit): Promise<Game[]> => {
  let tmp = '';
  if (ordering === 'total_rating') {
    tmp = 'and total_rating_count >= 100';
  }
  const data: GameDbFormat[] = await db.queryPromised(
    `select * from game where genres is not null and cover is not null ${tmp} order by ${ordering} DESC limit ${limit}`,
    []);
  const games: Game[] = data.map((g) => convertGameDbFormatToRegular(g));

  return games;
};
