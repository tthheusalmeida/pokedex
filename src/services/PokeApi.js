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
  Functions to Regions
*/
export async function fetchPokemon(id) {
  let baseURL = 'https://pokeapi.co/api/v2/pokemon/';

  if (id) {
    baseURL = baseURL.concat(id);
  }

  const data = await fetchData(baseURL);

  console.log('pokemon: ', data);
  return data;
}

export async function getRegionsList() {
  const baseURL = 'https://pokeapi.co/api/v2/region/';
  const data = await fetchData(baseURL);

  const { results } = data;

  return results;
}

async function fetchRegionData(regionName) {
  const regionsUrlslist = await getRegionsList();

  const { url } = regionsUrlslist.filter(({ name }) => name === regionName).shift();

  const regionPromise = await fetchData(url);

  return regionPromise;
}

export async function getPokemonsByRegion(regionName) {
  const { main_generation } = await fetchRegionData(regionName);
  const { pokemon_species } = await fetchData(main_generation.url);

  const pokemonsRequest = [];

  for (let index = 0; index < pokemon_species.length; index += 1) {
    const regex = /-species/gi;

    const rawPokemonUrl = pokemon_species[index].url;

    const pokemonUrl = rawPokemonUrl.replace(regex, '');

    pokemonsRequest.push(fetchData(pokemonUrl));
  }

  const data = [];

  await Promise.all(pokemonsRequest)
    .then((value) => {
      data.push(value);
    });

  const pokemonsData = data.shift();

  pokemonsData.sort((a, b) => ((a.id > b.id) ? 1 : -1));

  return pokemonsData;
}
