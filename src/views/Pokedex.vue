<template>
  <div class="container">
    <PokedexHeader />

    <PokeList v-if="showList"/>
    <PokeDetails v-else-if="showDetails"/>
  </div>
</template>

<script>
import PokedexHeader from '@/components/PokedexHeader.vue';
import PokeList from '@/components/PokeList.vue';
import PokeDetails from '@/components/PokeDetails.vue';
import { mapGetters, mapActions } from 'vuex';

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

    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
