import callGameApi from 'server/utils/callGameApi';
import {
  Game,
  SimpleGame,
} from 'shared/model/game';

export const getSimpleGame = (g): SimpleGame => {
  const platforms = g.platforms.map((v) => (
    {
      id: v.platform.id,
      name: v.platform.name,
    }),
  );
  const genres = g.genres.map((v) => (
    {
      id: v.id,
      name: v.name,
    }),
  );
  const stores = g.stores.map((v) => (
    {
      id: v.id,
      url: v.url,
      store: {
        id: v.store.id,
        name: v.store.name,
      },
    }),
  );
  const tags = g.tags.map((v) => (
    {
      id: v.id,
      name: v.name,
    }),
  );
  const clip = !(g.clip)
    ? null
    : {
      clip: g.clip.clip,
      video: g.clip.video,
      preview: g.clip.preview,
    };

  return {
    id: g.id,
    name: g.name,
    tba: g.tba,
    platforms,
    genres,
    released: g.released,
    metacritic: g.metacritic,
    added: g.added,
    rating: g.rating,
    ratingsCount: g.ratings_count,
    backgroundImage: g.background_image,
    stores,
    clip,
    tags,
  };
};

export const getRegularGame = (g): Game => {
  const updated = g.updated.split('T')[0];
  const platforms = g.platforms.map((v) => (
    {
      id: v.platform.id,
      name: v.platform.name,
    }),
  );
  const genres = g.genres.map((v) => (
    {
      id: v.id,
      name: v.name,
    }),
  );
  const developers = g.developers.map((v) => (
    {
      id: v.id,
      name: v.name,
    }),
  );
  const publishers = g.publishers.map((v) => (
    {
      id: v.id,
      name: v.name,
    }),
  );
  const stores = g.stores.map((v) => (
    {
      id: v.id,
      url: v.url,
      store: {
        id: v.store.id,
        name: v.store.name,
      },
    }),
  );
  const tags = g.tags.map((v) => (
    {
      id: v.id,
      name: v.name,
    }),
  );
  const clip = !(g.clip)
    ? null
    : {
      clip: g.clip.clip,
      video: g.clip.video,
      preview: g.clip.preview,
    };

  return {
    id: g.id,
    name: g.name,
    tba: g.tba,
    platforms,
    genres,
    released: g.released,
    updated,
    metacritic: g.metacritic,
    added: g.added,
    rating: g.rating,
    ratingsCount: g.ratings_count,
    backgroundImage: g.background_image,
    developers,
    publishers,
    stores,
    clip,
    tags,
    website: g.website,
    playtime: g.playtime,
    screenshotsCount: g.screenshots_count,
    moviesCount: g.movies_count,
    suggestionsCount: g.suggestions_count,
    gameSeriesCount: g.game_series_count,
    additionsCount: g.additions_count,
    alternativeNames: g.alternative_names,
  };
};

export const getGameFromApi = async (id: number): Promise<Game> => {
  const api = await callGameApi(`/games/${id}`);
  return getRegularGame(api);
};
