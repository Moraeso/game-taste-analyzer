import callApi from 'server/utils/callApi';

class GameDataService {
  public static async getGameData(id) {
    const queryString = `
    fields
      id,
      name,
      involved_companies,
      first_release_date,
      cover,
      platforms,
      genres,
      themes,
      summary,
      artworks,
      player_perspectives,
      similar_games,
      videos,
      game_modes;
    where id = ${id};
    `;
    return callApi('/games', queryString);
  }

  public static async getRealGameData(game) {
    const developer = await this.getDeveloper(game.involved_companies);
    const cover = await this.getCover(game.cover);
    const platforms = await this.getPlatforms(game.platforms);
    const genres = await this.getGenres(game.genres);
    const artworks = await this.getArtworks(game.artworks);
    const themes = await this.getThemes(game.themes);
    const playerPerspectives = await this.getPlayerPerspectives(game.player_perspectives);
    const videos = await this.getVideos(game.videos);
    const gameModes = await this.getGameModes(game.game_modes);

    const result = {
      ...game,
      firstReleaseDate: game.first_release_data,
      similarGames: game.similar_games,
      developer,
      cover,
      platforms,
      genres,
      artworks,
      themes,
      playerPerspectives,
      videos,
      gameModes,
    };
    delete result.first_release_data;
    delete result.game_modes;
    delete result.involved_companies;
    delete result.player_perspectives;
    delete result.player_perspectives;
    delete result.similar_games;

    return result;
  }

  public static async getDeveloper(involvedCompaniesId) {
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
  }

  public static async getCover(coverId) {
    if (!coverId) return '';
    const cover = await callApi('/covers', `fields image_id, width, height, url; where id=${coverId};`);
    return cover.url
      .replace('//', 'http://')
      .replace('t_thumb', 't_1080p'); // 1080p, 720p, cover_big, cover_small
  }

  public static async getPlatforms(platformsId) {
    if (!platformsId) return [''];
    const promises = [];
    platformsId.forEach((platform) => {
      const queryString = `fields name; where id=${platform};`;
      promises.push(callApi('/platforms', queryString));
    });
    const platforms = await Promise.all(promises);
    return platforms.map((platform) => platform.name);
  }

  public static async getGenres(genresId) {
    if (!genresId) return [''];
    const promises = [];
    genresId.forEach((genre) => {
      const queryString = `fields name; where id=${genre};`;
      promises.push(callApi('/genres', queryString));
    });
    const genres = await Promise.all(promises);
    return genres.map((genre) => genre.name);
  }

  public static async getArtworks(artworksId) {
    if (!artworksId) return [''];
    const promises = [];
    artworksId.forEach((artwork) => {
      const queryString = `fields image_id, width, height, url; where id=${artwork};`;
      promises.push(callApi('/artworks', queryString));
    });
    const artworks = await Promise.all(promises);
    return artworks.map((artwork) => artwork.url
      .replace('//', 'http://')
      .replace('t_thumb', 't_1080p')); // 1080p, 720p, screenshot_huge, screenshot_big, screenshot_med
  }

  public static async getThemes(themesId) {
    if (!themesId) return [''];
    const promises = [];
    themesId.forEach((theme) => {
      const queryString = `fields name; where id=${theme};`;
      promises.push(callApi('/themes', queryString));
    });
    const themes = await Promise.all(promises);
    return themes.map((theme) => theme.name);
  }

  public static async getPlayerPerspectives(playerPerspectivesId) {
    if (!playerPerspectivesId) return [''];
    const promises = [];
    playerPerspectivesId.forEach((playerPerspective) => {
      const queryString = `fields name; where id=${playerPerspective};`;
      promises.push(callApi('/player_perspectives', queryString));
    });
    const playerPerspectives = await Promise.all(promises);
    return playerPerspectives.map((playerPerspective) => playerPerspective.name);
  }

  public static async getVideos(videosId) {
    if (!videosId) return [''];
    const promises = [];
    videosId.forEach((video) => {
      const queryString = `fields video_id, name; where id=${video};`;
      promises.push(callApi('/game_videos', queryString));
    });
    const videos = await Promise.all(promises);
    return videos.map((video) => ({
      name: video.name,
      url: `https://www.youtube.com/watch?v=${video.video_id}`,
    }));
  }

  public static async getGameModes(gameModesId) {
    if (!gameModesId) return [''];
    const promises = [];
    gameModesId.forEach((gameMode) => {
      const queryString = `fields name; where id=${gameMode};`;
      promises.push(callApi('/game_modes', queryString));
    });
    const gameModes = await Promise.all(promises);
    return gameModes.map((gameMode) => gameMode.name);
  }
}

export default GameDataService;
