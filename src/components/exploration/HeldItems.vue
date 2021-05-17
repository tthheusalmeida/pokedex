<template>
  <div class="held">
    <h2
      class="d-flex justify-center"
    >
      Held Items
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
  name: 'HeldItems',
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
          text: 'Item',
          value: 'item',
          align: 'center',
          sortable: false,
        },
      ];
    },
    desserts() {
      const allheldItems = this.pokemon.held_items.map((each) => ({ item: each.item.name }));
      console.log('allMoves: ', allheldItems);

      return allheldItems.map((each) => ({ item: removeDashFromString(each.item) }));
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    itemsPerPage() {
      return this.isMobile ? 3 : 4;
    },
    totalVisible() {
      return this.isMobile ? 3 : 7;
    },
  },
};
</script>

<style lang="scss">
  .held {
    color: var(--card-white);
  }

</style>
