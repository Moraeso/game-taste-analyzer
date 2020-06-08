import {
  Game,
  GameApiFormat,
} from 'server/model/game';
import callGameApi from 'server/utils/callGameApi';

const convertUnixTimeStampToDate = (unixTimeStamp: any): Date => new Date(unixTimeStamp * 1000);

const getDeveloper = async (involvedCompaniesId: number[]): Promise<string> => {
  if (!involvedCompaniesId) return null;
  const promises = [];
  involvedCompaniesId.forEach((company) => {
    const queryString = `fields company, developer; where id=${company};`;
    promises.push(callGameApi('/involved_companies', queryString));
  });
  const companies = await Promise.all(promises);

  let developerId = 0;
  companies.forEach((company) => {
    if (company.developer) {
      developerId = company.company;
    }
  });
  const developer = await callGameApi('/companies', `fields name; where id=${developerId};`);
  return developer.name;
};

const getCover = async (coverId: number): Promise<string> => {
  if (!coverId) return null;
  const cover = await callGameApi('/covers', `fields image_id, width, height, url; where id=${coverId};`);
  return cover.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p'); // 1080p, 720p, cover_big, cover_small
};

const getPlatforms = async (platformsId: number[]): Promise<string[]> => {
  if (!platformsId) return null;
  const promises = [];
  platformsId.forEach((platform) => {
    const queryString = `fields name; where id=${platform};`;
    promises.push(callGameApi('/platforms', queryString));
  });
  const platforms = await Promise.all(promises);
  return platforms.map((platform) => platform.name);
};

const getGenres = async (genresId: number[]): Promise<string[]> => {
  if (!genresId) return null;
  const promises = [];
  genresId.forEach((genre) => {
    const queryString = `fields name; where id=${genre};`;
    promises.push(callGameApi('/genres', queryString));
  });
  const genres = await Promise.all(promises);
  return genres.map((genre) => genre.name);
};

const getArtworks = async (artworksId: number[]): Promise<string[]> => {
  if (!artworksId) return null;
  const filteredArtworksId = artworksId.slice(0, 10);
  const promises = [];
  filteredArtworksId.forEach((artwork) => {
    const queryString = `fields image_id, width, height, url; where id=${artwork};`;
    promises.push(callGameApi('/artworks', queryString));
  });
  const artworks = await Promise.all(promises);
  return artworks.map((artwork) => artwork.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p')); // 1080p, 720p, screenshot_huge, screenshot_big, screenshot_med
};

const getScreenshots = async (screenshotsId: number[]): Promise<string[]> => {
  if (!screenshotsId) return null;
  const filteredScreenshotsId = screenshotsId.slice(0, 10);
  const promises = [];
  filteredScreenshotsId.forEach((screenshot) => {
    const queryString = `fields image_id, width, height, url; where id=${screenshot};`;
    promises.push(callGameApi('/screenshots', queryString));
  });
  const artworks = await Promise.all(promises);
  return artworks.map((screenshot) => screenshot.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p')); // 1080p, 720p, screenshot_huge, screenshot_big, screenshot_med
};

const getThemes = async (themesId: number[]): Promise<string[]> => {
  if (!themesId) return null;
  const promises = [];
  themesId.forEach((theme) => {
    const queryString = `fields name; where id=${theme};`;
    promises.push(callGameApi('/themes', queryString));
  });
  const themes = await Promise.all(promises);
  return themes.map((theme) => theme.name);
};

const getPlayerPerspectives = async (playerPerspectivesId: number[]): Promise<string[]> => {
  if (!playerPerspectivesId) return null;
  const promises = [];
  playerPerspectivesId.forEach((playerPerspective) => {
    const queryString = `fields name; where id=${playerPerspective};`;
    promises.push(callGameApi('/player_perspectives', queryString));
  });
  const playerPerspectives = await Promise.all(promises);
  return playerPerspectives.map((playerPerspective) => playerPerspective.name);
};

const getVideo = async (videoId: number): Promise<string> => {
  if (!videoId) return null;
  const queryString = `fields video_id; where id=${videoId};`;
  const video = await callGameApi('/game_videos', queryString);
  return `https://www.youtube.com/watch?v=${video.video_id}`;
};

const getGameModes = async (gameModesId: number[]): Promise<string[]> => {
  if (!gameModesId) return null;
  const promises = [];
  gameModesId.forEach((gameMode) => {
    const queryString = `fields name; where id=${gameMode};`;
    promises.push(callGameApi('/game_modes', queryString));
  });
  const gameModes = await Promise.all(promises);
  return gameModes.map((gameMode) => gameMode.name);
};

const getWebsite = async (gameId: number): Promise<string> => {
  /*
  official 1
  wikia 2
  wikipedia 3
  facebook 4
  twitter 5
  twitch 6
  instagram 8
  youtube 9
  iphone 10
  ipad 11
  android 12
  steam 13
  reddit 14
  itch 15
  epicgames 16
  gog 17
  */
  const queryString = `fields url; where game=${gameId} & category=1;`;
  const website = await callGameApi('/websites', queryString);
  if (!website) return null;
  return website.url;
};

export const convertGameApiFormatToRegular = async (original: GameApiFormat): Promise<Game> => {
  const developer = await getDeveloper(original.involved_companies);
  const firstReleaseDate = convertUnixTimeStampToDate(original.first_release_date);
  const platforms = await getPlatforms(original.platforms);
  const genres = await getGenres(original.genres);
  const themes = await getThemes(original.themes);
  const playerPerspectives = await getPlayerPerspectives(original.player_perspectives);
  const gameModes = await getGameModes(original.game_modes);
  const cover = await getCover(original.cover);
  const artworks = await getArtworks(original.artworks);
  const screenshots = await getScreenshots(original.screenshots);
  const video = await getVideo(original.videos[0]);
  const website = await getWebsite(original.id);

  return {
    id: original.id,
    name: original.name,
    developer,
    firstReleaseDate,
    platforms,
    genres,
    themes,
    playerPerspectives,
    gameModes,
    summary: original.summary,
    cover,
    artworks,
    screenshots,
    video,
    website,
    popularity: original.popularity,
    totalRating: original.total_rating,
    totalRatingCount: original.total_rating_count,
    similarGames: null,
  };
};

export const getGameFromApi = async (id: number): Promise<GameApiFormat> => {
  const queryString = `
    fields
      id,
      name,
      involved_companies,
      first_release_date,
      platforms,
      genres,
      themes,
      player_perspectives,
      game_modes,
      summary,
      cover,
      artworks,
      screenshots,
      videos,
      websites,
      popularity,
      total_rating,
      total_rating_count,
      similar_games;
    where id = ${id};
    `;
  return callGameApi('/games', queryString);
};
