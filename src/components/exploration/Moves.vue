<template>
  <div class="moves">
    <h2
      class="d-flex justify-center"
    >
      Moves
    </h2>

    <div>
      <v-data-table
        dense
        fixed-header
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="4"
        :page.sync="page"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        color="blue lighten-1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Moves',
  data() {
    return {
      page: 1,
      pageCount: 0,
    };
  },
  computed: {
    ...mapGetters('pokemon', [
      'getPokemons',
    ]),
    ...mapGetters('card', [
      'getPokemonDetails',
    ]),
    pokemon() {
      return this.getPokemons
        .filter((pokemon) => pokemon.id === Number(this.getPokemonDetails.id))[0];
    },
    headers() {
      return [
        {
          text: 'Move',
          value: 'move',
          align: 'center',
          sortable: false,
        },
      ];
    },
    desserts() {
      const allMoves = this.pokemon.moves;
      const moves = allMoves.map((move) => {
        console.log('move.name: ', move.name);

        return { move: move.name }; // undefined
      });

      return moves;
    },
  },
};
</script>

<style lang="scss">
  .moves {
    color: var(--card-white);
  }

</style>
