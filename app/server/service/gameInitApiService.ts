import {
  Game,
  GameApiFormat,
} from 'shared/interfaces/game';
import callApi from 'server/utils/callApi';

const convertUnixTimeStampToDate = (unixTimeStamp: any) => new Date(unixTimeStamp * 1000);

const getDeveloper = async (involvedCompaniesId: number[]) => {
  if (!involvedCompaniesId) return '';
  const promises = [];
  involvedCompaniesId.forEach((company) => {
    const queryString = `fields company, developer; where id=${company};`;
    promises.push(callApi('/involved_companies', queryString));
  });
  const companies = await Promise.all(promises);

  let developerId = 0;
  companies.forEach((company) => {
    if (company.developer) {
      developerId = company.company;
    }
  });
  const developer = await callApi('/companies', `fields name; where id=${developerId};`);
  return developer.name;
};

const getCover = async (coverId: number) => {
  if (!coverId) return '';
  const cover = await callApi('/covers', `fields image_id, width, height, url; where id=${coverId};`);
  return cover.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p'); // 1080p, 720p, cover_big, cover_small
};

const getPlatforms = async (platformsId: number[]) => {
  if (!platformsId) return [''];
  const promises = [];
  platformsId.forEach((platform) => {
    const queryString = `fields name; where id=${platform};`;
    promises.push(callApi('/platforms', queryString));
  });
  const platforms = await Promise.all(promises);
  return platforms.map((platform) => platform.name);
};

const getGenres = async (genresId: number[]) => {
  if (!genresId) return [''];
  const promises = [];
  genresId.forEach((genre) => {
    const queryString = `fields name; where id=${genre};`;
    promises.push(callApi('/genres', queryString));
  });
  const genres = await Promise.all(promises);
  return genres.map((genre) => genre.name);
};

const getArtworks = async (artworksId: number[]) => {
  if (!artworksId) return [''];
  const filteredArtworksId = artworksId.slice(0, 5);
  const promises = [];
  filteredArtworksId.forEach((artwork) => {
    const queryString = `fields image_id, width, height, url; where id=${artwork};`;
    promises.push(callApi('/artworks', queryString));
  });
  const artworks = await Promise.all(promises);
  return artworks.map((artwork) => artwork.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p')); // 1080p, 720p, screenshot_huge, screenshot_big, screenshot_med
};

const getScreenshots = async (screenshotsId: number[]) => {
  if (!screenshotsId) return [''];
  const filteredScreenshotsId = screenshotsId.slice(0, 5);
  const promises = [];
  filteredScreenshotsId.forEach((screenshot) => {
    const queryString = `fields image_id, width, height, url; where id=${screenshot};`;
    promises.push(callApi('/screenshots', queryString));
  });
  const artworks = await Promise.all(promises);
  return artworks.map((screenshot) => screenshot.url
    .replace('//', 'http://')
    .replace('t_thumb', 't_1080p')); // 1080p, 720p, screenshot_huge, screenshot_big, screenshot_med
};

const getThemes = async (themesId: number[]) => {
  if (!themesId) return [''];
  const promises = [];
  themesId.forEach((theme) => {
    const queryString = `fields name; where id=${theme};`;
    promises.push(callApi('/themes', queryString));
  });
  const themes = await Promise.all(promises);
  return themes.map((theme) => theme.name);
};

const getPlayerPerspectives = async (playerPerspectivesId: number[]) => {
  if (!playerPerspectivesId) return [''];
  const promises = [];
  playerPerspectivesId.forEach((playerPerspective) => {
    const queryString = `fields name; where id=${playerPerspective};`;
    promises.push(callApi('/player_perspectives', queryString));
  });
  const playerPerspectives = await Promise.all(promises);
  return playerPerspectives.map((playerPerspective) => playerPerspective.name);
}

const getVideo = async (videoId: number) => {
  if (!videoId) return '';
  const queryString = `fields video_id; where id=${videoId};`;
  const video = await callApi('/game_videos', queryString);
  return `https://www.youtube.com/watch?v=${video.video_id}`;
};

const getGameModes = async (gameModesId: number[]) => {
  if (!gameModesId) return [''];
  const promises = [];
  gameModesId.forEach((gameMode) => {
    const queryString = `fields name; where id=${gameMode};`;
    promises.push(callApi('/game_modes', queryString));
  });
  const gameModes = await Promise.all(promises);
  return gameModes.map((gameMode) => gameMode.name);
};

const getWebsite = async (gameId: number) => {
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
  const website = await callApi('/websites', queryString);
  return website.url || '';
};

export const convertGameApiFormatToRegular = async (original: GameApiFormat) => {
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

  const game: Game = {
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
    similarGame: null,
  };
  return game;
};

export const getGameFromApi = async (id: number) => {
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
  const gameApiFormat: GameApiFormat = await callApi('/games', queryString);
  return gameApiFormat;
};
