/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
// eslint-disable-next-line import/prefer-default-export
import axios from 'axios';

/*
  Constants
*/

export const END_POINT = {
  POKEMON: 'pokemon',
  REGION: 'region',
  GENERATION: 'generation',
};

/*
  Functions
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

export async function fetchEndPointData(collection, id) {
  let baseURL = `https://pokeapi.co/api/v2/${collection}/`;

  if (id) {
    baseURL = baseURL.concat(id);
  }

  const data = await fetchData(baseURL);

  return data;
}

export async function fetchRegion(region) {
  const rowData = await fetchEndPointData(END_POINT.REGION, region);

  if (!region) {
    const { results } = rowData;

    return results.map((single, index) => ({ ...single, id: index + 1 }));
  }

  return rowData;
}

export async function fetchGeneration(generation) {
  const rowData = await fetchEndPointData(END_POINT.GENERATION, generation);

  if (!generation) {
    return rowData;
  }

  const { pokemon_species } = rowData;
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
