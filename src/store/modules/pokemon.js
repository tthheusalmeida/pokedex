/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import {
  getPokemonsData,
} from '@/services/PokeApi';

const state = {
  pokemons: [],
  generations: [],
  requestStatus: false,
};

const getters = {
  getPokemons: state => state.pokemons,
  getGenerations: state => state.generations,
  getRequestStatus: state => state.requestStatus,
};

const actions = {
  async fetchPokemonsByGenerations({ commit }) {
    state.requestStatus = false;
    const data = await getPokemonsData();

    commit('setGenerations', data);
    commit('setPokemons', 'kanto');
  },

  async setPokemonsData({ commit }, payload) {
    commit('setPokemons', payload);
  },
};

const mutations = {
  setGenerations(state, payload) {
    state.generations = payload;

    state.requestStatus = true;
  },

  setPokemons(state, payload) {
    const { regions } = state.generations;

    if (payload === 'all') {
      const allData = regions
        .filter(({ pokemons }) => pokemons);

      const allPokemons = allData
        .map(({ pokemons }) => pokemons)
        .flat(2);

      state.pokemons = allPokemons;
    }

    const { pokemons } = regions
      .filter(({ name }) => name === payload.value)
      .shift();

    state.pokemons = pokemons;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
