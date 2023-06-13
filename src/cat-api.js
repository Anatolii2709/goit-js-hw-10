export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const API_KEY =
    'live_D3CfwYnvW18Bdt42nu3ee8Kp0GRuTH7ynfeJRjFJRz5aYrICnwIq2Guftz0UPtMR';

  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }
    return response.json();
  });
  // .then(data => data.map(breed => ({ id: breed.id, name: breed.name })));
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const API_KEY =
    'live_D3CfwYnvW18Bdt42nu3ee8Kp0GRuTH7ynfeJRjFJRz5aYrICnwIq2Guftz0UPtMR';

  return fetch(
    `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch cat');
    }
    return response.json();
  });
}
