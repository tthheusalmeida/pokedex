<template>
  <div class="moves">
    <DataTable
      :title="title"
      :headers="headers"
      :desserts="desserts"
    />
  </div>
</template>

<script>
import DataTable from '@/components/base/DataTable.vue';
import { removeDashFromString } from '@/utils/formatter';
import { mapGetters } from 'vuex';

export default {
  name: 'Moves',
  components: {
    DataTable,
  },
  data() {
    return {
      title: 'Moves',
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
  },
};
</script>
