// utils.js
import BASE_URL from './config';

export function getFullUrl(path) {
  return `${BASE_URL}${path}`;
}
