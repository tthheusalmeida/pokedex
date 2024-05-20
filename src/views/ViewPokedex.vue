<template>
  <div class="pokedex__container">
    <PokedexHeader />
    <PokeFilter v-show="showList"/>
    <PokeList v-if="showList"/>

    <div
      v-show="showDetails"
      class="pokedex__information"
      v-else-if="showDetails"
    >
      <div>
        <PokeDetails />
      </div>
    </div>

    <div class="pokedex__footer">
      <div class="pokedex__footer__buttons">
        <a
          v-for="icon in icons"
          :key="icon.value"
          :href="icon.url"
          target="_blank"
        >
          {{ icon.value }}
        </a>

        <div>
          Made with ❤️ by Matheus Almeida
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokedexHeader from '@/components/PokedexHeader.vue';
import PokeFilter from '@/components/filter/PokeFilter.vue';
import PokeList from '@/components/PokeList.vue';
import PokeDetails from '@/components/PokeDetails.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ViewPokedex',
  components: {
    PokedexHeader,
    PokeFilter,
    PokeList,
    PokeDetails,
  },
  data() {
    return {
      page: 1,
      icons: [{
        value: 'LinkedIn',
        url: 'https://www.linkedin.com/in/matheus-almeida-602139182/',
      },
      {
        value: 'Github',
        url: 'https://github.com/tthheusalmeida',
      }],
    };
  },
  created() {
    this.registerPokemons();
  },
  computed: {
    ...mapGetters('card', [
      'getDetails',
    ]),
    showList() {
      return !this.getDetails;
    },
    showDetails() {
      return this.getDetails;
    },
  },
  methods: {
    ...mapActions('pokemon', [
      'registerPokemons',
    ]),
    goToUrl(url) {
      return url;
    },
  },
};
</script>

<style lang="css">
  .pokedex__container {
    margin: 0 !important;
    padding: 0 !important;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pokedex__information {
    display: grid;
  }

  .pokedex__footer {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    background: var(--darkest-ruby-red);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: var(--card-white);
  }

  .pokedex__footer__buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
  }

  .pokedex__footer__buttons a {
    display: block;
    align-self: flex-end;
  }

  .pokedex__footer__buttons a:active,
  .pokedex__footer__buttons a:focus,
  .pokedex__footer__buttons a:checked,
  .pokedex__footer__buttons a:focus,
  .pokedex__footer__buttons a:hover,
  .pokedex__footer__buttons a:visited {
    color: var(--card-white);
  }

  .pokedex__footer__buttons a:hover {
    opacity: 0.8;
  }
</style>
