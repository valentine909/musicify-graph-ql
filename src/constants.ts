export enum Microservice {
  albums = 'http://localhost:3005/v1/albums',
  artists = 'http://localhost:3002/v1/artists',
  bands = 'http://localhost:3003/v1/bands',
  favourites = 'http://localhost:3007/v1/favourites',
  genres = 'http://localhost:3001/v1/genres',
  tracks = 'http://localhost:3006/v1/tracks',
  users = 'http://localhost:3004/v1/users',
  resister = 'http://localhost:3004/v1/users/register',
  login = 'http://localhost:3004/v1/users/login',
  verify = 'http://localhost:3004/v1/users/verify',
}

export interface IConfig {
  headers: {
    Authorization: string | undefined;
  };
}

export const Config = {
  headers: { Authorization: undefined },
};

export const PaginationSettings = {
  limit: 5,
  offset: 0,
};
