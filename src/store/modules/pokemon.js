/* eslint-disable no-var */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import { fetchPokemonData } from '@/services/PokeApi';

const state = {
  pokemons: [],
  requestStatus: false,
};

const getters = {
  getPokemons: state => state.pokemons,
  getRequestStatus: state => state.requestStatus,
};

const actions = {
  async fetchPokemonsData({ commit }) {
    var pokemonsRequest = [];
    this.requestStatus = false;
    for (let index = 1; index < 152; index += 1) {
      pokemonsRequest.push(fetchPokemonData(index));
    }

    await Promise.all(pokemonsRequest)
      .then((value) => state.pokemons.push(value));

    commit('setPokemons', state.pokemons.shift());
  },
};

const mutations = {
  setPokemons(state, payload) {
    state.pokemons = payload;
    state.requestStatus = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
