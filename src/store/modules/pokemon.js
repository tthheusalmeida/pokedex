/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import {
  getRegionsList,
  getPokemonsByRegion,
  fetchPokemon,
} from '@/services/PokeApi';

const state = {
  regions: [],
  pokemons: [],
  requestStatus: false,
};

const getters = {
  getRegions: state => state.regions,
  getPokemons: state => state.pokemons,
  getRequestStatus: state => state.requestStatus,
};

const actions = {
  async registerRegions({ commit }) {
    const regions = await getRegionsList();

    commit('setRegions', regions);
  },

  async registerPokemons({ commit, dispatch }, payload) {
    state.requestStatus = false;

    if (state.regions.length === 0) {
      await dispatch('registerRegions');
    }

    let pokemons = [];

    if (!payload) {
      const [{ name }] = state.regions;

      pokemons = await getPokemonsByRegion(name);
    } else {
      pokemons = await getPokemonsByRegion(payload);
    }

    commit('setPokemons', pokemons);
  },

  // TODO Remove this test function
  async test(state, payload) {
    const data = await fetchPokemon(payload);
    console.log('data: ', data);
  },
};

const mutations = {
  setRegions(state, payload) {
    state.regions = payload;
  },

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
