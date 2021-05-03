import Vue from 'vue';
import Vuex from 'vuex';
import card from './modules/card';
import pokemon from './modules/pokemon';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    card,
    pokemon,
  },
});
