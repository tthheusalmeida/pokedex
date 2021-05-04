<template>
  <div class="container">
    <PokedexHeader />

    <PokeList />
    <PokeDetails />
  </div>
</template>

<script>
import PokedexHeader from '@/components/PokedexHeader.vue';
import PokeList from '@/components/PokeList.vue';
import PokeDetails from '@/components/PokeDetails.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Pokedex',
  components: {
    PokedexHeader,
    PokeList,
    PokeDetails,
  },
  created() {
    this.fetchPokemonsData();
  },
  methods: {
    ...mapActions('pokemon', [
      'fetchPokemonsData',
    ]),
  },
};
</script>

<style lang="scss">
  .container {
    min-width: 100vw;
    margin: 0 !important;
    padding: 0 !important;
  }

</style>
