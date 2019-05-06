import fetch from 'isomorphic-fetch';

const hostname = window.location.origin;
const base = hostname + '/api';

export const address = {
  summary: base + '/summary',
  text: base + '/text'
};

export const stringify = body => {
  if (!body) return '';
  return Object.entries(body).map(item => `${item[0]}=${item[1]}`).join('&');
};

export const executeFetch = (...args) => new Promise(async (resolve, reject) => {
  let response = {}, result = {};
  try {
    response = await fetch(...args);
    result = await response.json();
  } catch (e) {}
  response.status === 200 ? resolve(result) : reject(result);
});