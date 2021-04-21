import Vue from 'vue';
import VueRouter from 'vue-router';
import Pokedex from '@/views/Pokedex.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Pokedex',
    component: Pokedex,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
