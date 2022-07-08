import { Config } from './constants';

export const mapId = (obj) => {
  obj['id'] = obj['_id'];
  delete obj['_id'];
  return obj;
};

export const mapIdInArray = (array) => {
  return array.map((obj) => mapId(obj));
};

export const mapGenresId = (obj) => {
  obj['genresIds'] = obj['genres'];
  delete obj['genres'];
  return obj;
};

export const mapBandsId = (obj) => {
  obj['bandsIds'] = obj['bands'];
  delete obj['bands'];
  return obj;
};

export const mapArtistsId = (obj) => {
  obj['artistsIds'] = obj['artists'];
  delete obj['artists'];
  return obj;
};

export const mapTracksId = (obj) => {
  obj['trackIds'] = obj['tracks'];
  delete obj['tracks'];
  return obj;
};

export const mapAlbumsId = (obj) => {
  obj['albumId'] = obj['album'];
  delete obj['album'];
  return obj;
};

export const getAuthHeaders = (jwt) => {
  const config = { ...Config };
  config.headers.Authorization = jwt;
  return config;
};
