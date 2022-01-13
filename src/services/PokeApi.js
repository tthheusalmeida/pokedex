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
  const rawData = await fetchEndPointData(END_POINT.REGION, region);

  if (!region) {
    const { results } = rawData;

    return results.map((single, index) => ({ ...single, id: index + 1 }));
  }

  return rawData;
}

export async function fetchGeneration(generation) {
  const rawData = await fetchEndPointData(END_POINT.GENERATION, generation);

  if (!generation) {
    return rawData;
  }

  const { pokemon_species } = rawData;
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

export async function fetchGenerationAux(generation) {
  const rawData = await fetchEndPointData(END_POINT.GENERATION, generation);

  if (!generation) {
    return rawData;
  }

  const { pokemon_species } = rawData;

  const data = pokemon_species.map(({ name, url }) => {
    const regex = /\/([^/]+)\/?$/;
    const id = Number(url.match(regex)[1]);

    return { name, id };
  });

  data.sort((a, b) => a.id - b.id);

  return data;
}
