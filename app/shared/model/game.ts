export interface SimpleGame {
  id: number;
  name: string;
  tba: boolean;
  platforms: Platform[];
  parentPlatforms: ParentPlatform[];
  genres: Genre[];
  released: Date;
  metacritic: number;
  added: number;
  rating: number;
  ratingsCount: number;
  backgroundImage: string;
  stores: Store[];
  clip: {
    clip: string;
    video: string;
    preview: string;
  };
  tags: Tag[];
}

export interface Game {
  id: number;
  name: string;
  tba: boolean;
  platforms: Platform[];
  genres: Genre[];
  released: Date;
  updated: Date;
  metacritic: number;
  added: number;
  rating: number;
  ratingsCount: number;
  backgroundImage: string;
  developers: Developer[];
  publishers: Publisher[];
  stores: Store[];
  clip: {
    clip: string;
    video: string;
    preview: string;
  };
  tags: Tag[];
  website: string;
  playtime: number;
  screenshotsCount: number;
  moviesCount: number;
  suggestionsCount: number;
  gameSeriesCount: number;
  additionsCount: number;
  alternativeNames: string[];
}

export interface Platform {
  id: number;
  name: string;
}

export interface ParentPlatform {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Developer {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface Store {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
  };
}

export interface Tag {
  id: number;
  name: string;
}
