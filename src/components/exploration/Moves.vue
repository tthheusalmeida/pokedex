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
        hide-default-header
        hide-default-footer
        :headers="headers"
        :items="desserts"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="totalVisible"
        color="blue lighten-1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { removeDashFromString } from '@/utils/formatter';
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

      return allMoves.map((each) => ({ move: removeDashFromString(each.move.name) }));
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    itemsPerPage() {
      return this.isMobile ? 3 : 4;
    },
    totalVisible() {
      return this.isMobile ? 3 : 5;
    },
  },
};
</script>

<style lang="scss">
  .moves {
    color: var(--card-white);
  }

</style>
