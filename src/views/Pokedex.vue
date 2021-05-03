<template>
  <div class="container">
    <PokedexHeader />

    <PokeList v-if="requestStatus" />

    <Loading v-else />

    <PokeDetails />
  </div>
</template>

<script>
import PokedexHeader from '@/components/PokedexHeader.vue';
import PokeList from '@/components/PokeList.vue';
import Loading from '@/components/Loading.vue';
import PokeDetails from '@/components/PokeDetails.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Pokedex',
  components: {
    PokedexHeader,
    PokeList,
    Loading,
    PokeDetails,
  },
  created() {
    this.fetchPokemonsData();
  },
  computed: {
    ...mapGetters('pokemon', [
      'getRequestStatus',
    ]),
    requestStatus() {
      return this.getRequestStatus;
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
  }

</style>
