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

export const mapGenresIdInArray = (array) => {
  return array.map((obj) => mapGenresId(obj));
};

export const getAuthHeaders = (jwt) => {
  const config = { ...Config };
  config.headers.Authorization = jwt;
  return config;
};
