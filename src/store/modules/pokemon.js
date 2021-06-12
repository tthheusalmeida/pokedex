/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
import {
  getRegionsList,
  getPokemonsByRegion,
} from '@/services/PokeApi';

const state = {
  regions: [],
  pokemons: [],
  pokemonsTemp: [],
  requestStatus: false,
};

const getters = {
  getRegions: state => state.regions,
  getPokemons: state => state.pokemons,
  getPokemonsTemp: state => state.pokemonsTemp,
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
    dispatch('registerPokemonsTemp', pokemons);
  },

  async registerPokemonsTemp({ commit }, payload) {
    commit('setPokemonsTemp', payload);
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

  setPokemonsTemp(state, payload) {
    state.pokemonsTemp = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
