/* eslint-disable arrow-parens */
/* eslint-disable no-shadow */
const state = {
  details: false,
  pokemonDetails: null,
};

const getters = {
  getDetails: state => state.details,
  getPokemonDetails: state => state.pokemonDetails,
};

const actions = {
  toggleDetails({ commit }) {
    commit('setDetails');
  },
  setPokemonDetails({ commit }, payload) {
    commit('editPokemonDetails', payload);
  },
};

const mutations = {
  setDetails(state) {
    state.details = !state.details;
  },
  editPokemonDetails(state, payload) {
    state.pokemonDetails = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
