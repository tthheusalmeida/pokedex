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
  async fetchPokemonsByGenerations({ commit, dispatch }) {
    state.requestStatus = false;
    const data = await getPokemonsData();

    commit('setGenerations', data);

    const [firstRegion] = data.regions;

    dispatch('setPokemonsData', { value: firstRegion.name });
  },

  setPokemonsData({ commit }, payload) {
    commit('setPokemons', payload);
  },
};

const mutations = {
  setGenerations(state, payload) {
    state.generations = payload;
  },

  setPokemons(state, payload) {
    const { regions } = state.generations;

    const { pokemons } = regions
      .filter(({ name }) => name === payload.value)
      .shift();

    state.pokemons = pokemons;
    state.requestStatus = true;

    console.log('[pokemons] state.pokemons: ', state.pokemons[0]);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
