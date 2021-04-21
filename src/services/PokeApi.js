import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export async function fetchData(id) {
  const baseURL = `https://pokeapi.co/api/v2/pokemon/${id}`;
  // eslint-disable-next-line no-var
  var data = {};

  const pokeAPI = axios.create({
    baseURL,
  });

  await pokeAPI
    .get()
    .then((response) => {
      if (response.status === 200) {
        data = response;
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  return data;
}
