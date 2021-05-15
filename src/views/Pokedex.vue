<template>
  <div class="container">
    <PokedexHeader />

    <PokeList v-if="showList"/>

    <v-container
      v-else-if="showDetails"
      class="information pr-5"
    >
      <v-row
        no-gutters
        class="ma-2"
      >
        <v-col cols="6">
          <PokeDetails />
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="5">
          <PokeExploration />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PokedexHeader from '@/components/PokedexHeader.vue';
import PokeList from '@/components/PokeList.vue';
import PokeDetails from '@/components/PokeDetails.vue';
import PokeExploration from '@/components/PokeExploration.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Pokedex',
  components: {
    PokedexHeader,
    PokeList,
    PokeDetails,
    PokeExploration,
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

  .information {
    display: grid;
  }

</style>
