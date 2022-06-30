export const mapId = (obj) => {
  obj['id'] = obj['_id'];
  delete obj['_id'];
  return obj;
};

export const mapIdInArray = (array) => {
  return array.map((obj) => mapId(obj));
};
