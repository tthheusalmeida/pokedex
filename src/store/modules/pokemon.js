/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import {
  fetchRegion,
  fetchGeneration,
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
    const regions = await fetchRegion();

    commit('setRegions', regions);
  },

  async registerPokemons({ commit, dispatch }, payload) {
    state.requestStatus = false;

    if (state.regions.length === 0) {
      await dispatch('registerRegions');
    }

    let pokemons = [];

    if (!payload) {
      const [{ id }] = state.regions;

      pokemons = await fetchGeneration(id);
    } else {
      pokemons = await fetchGeneration(payload);
    }

    commit('setPokemons', pokemons);
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
