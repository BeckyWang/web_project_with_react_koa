import {
  executeFetch,
  address
} from './fetch';

export const generateSummary = originalText => executeFetch(address.summary, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(originalText)
});

export const getRandomText = () => executeFetch(address.text, {
  method: 'GET'
});