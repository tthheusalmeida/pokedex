<template>
  <div class="container">
    <PokedexHeader />

    <PokeList v-if="requestStatus"
      :pokemons="pokemons"
      :request-status="requestStatus"
    />
    <Loading v-else />

    <!-- <PokeDetails /> -->
  </div>
</template>

<script>
import PokedexHeader from '@/components/PokedexHeader.vue';
import PokeList from '@/components/PokeList.vue';
import Loading from '@/components/Loading.vue';
// import PokeDetails from '@/components/PokeDetails.vue';
import { fetchPokemonData } from '@/services/PokeApi';

export default {
  name: 'Pokedex',
  components: {
    PokedexHeader,
    PokeList,
    Loading,
    // PokeDetails,
  },
  data() {
    return {
      pokemons: [],
      requestStatus: false,
    };
  },
  created() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
      // eslint-disable-next-line no-var
      var pokemonsRequest = [];
      this.requestStatus = false;
      for (let index = 1; index < 152; index += 1) {
        pokemonsRequest.push(fetchPokemonData(index));
      }

      await Promise.all(pokemonsRequest)
        .then((value) => this.pokemons.push(value));
      this.pokemons = this.pokemons.shift();
      this.requestStatus = true;
    },
  },
};
</script>

<style lang="scss">
  .container {
    min-width: calc(90vw);
    margin: 0 !important;
    padding: 0 !important;
  }

</style>
