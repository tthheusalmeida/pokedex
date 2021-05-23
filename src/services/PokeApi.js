/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
// eslint-disable-next-line import/prefer-default-export
import axios from 'axios';

/*
  Local functions
*/
async function fetchData(url) {
  const baseURL = url;
  let data = {};

  const pokeAPI = axios.create({
    baseURL,
  });

  await pokeAPI
    .get()
    .then((response) => {
      if (response.status === 200) {
        data = response?.data;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  return data;
}

/*
  Functions to Generations
*/
async function getGenerationList() {
  const baseURL = 'https://pokeapi.co/api/v2/generation/';
  const data = fetchData(baseURL);

  return data;
}

async function fetchAllGenerations() {
  let generationslist = [];
  generationslist.push(getGenerationList());

  let resolvedList = [];

  await Promise.all(generationslist)
    .then(([{ results }]) => resolvedList.push(results));

  const [urls] = resolvedList;

  return urls.map(({ url }) => url);
}

async function fetchGenerations() {
  const generationsUrlslist = await fetchAllGenerations();

  let generationsListRequests = [];

  generationsUrlslist.forEach((url) => {
    const ulrData = fetchData(url);
    generationsListRequests.push(ulrData);
  });

  let generationsData = [];

  await Promise.all(generationsListRequests)
    .then((generation) => {
      generationsData.push(generation);
    });

  return generationsData.shift();
}

async function createPokemonRequests() {
  const rawData = await fetchGenerations();

  let newRawData = [];
  let regions = [];

  await rawData.forEach((generation) => {
    let { name } = generation.main_region;

    let pokemons = generation.pokemon_species
      .map(({ url }) => ({
        request: fetchData(url),
      }));

    regions.push({ name, pokemons: [] });
    newRawData.push(pokemons);
  });

  return {
    regions,
    pokemonsRequest: newRawData,
  };
}

async function resolvedPokemonRequests() {
  const { regions, pokemonsRequest } = await createPokemonRequests();

  let resolvedData = [];

  await Promise.all(pokemonsRequest)
    .then((resolved) => resolvedData.push(resolved));

  resolvedData = resolvedData.shift();

  for (let index = 0; index < pokemonsRequest.length; index++) {
    regions[index].pokemons = resolvedData[index];
  }

  return { regions };
}

export async function getPokemonsData() {
  const data = await resolvedPokemonRequests();

  return data;
}

/*
  Functions to Pokemons
*/
export async function fetchPokemonData(id) {
  const baseURL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const data = fetchData(baseURL);

  return data;
}
