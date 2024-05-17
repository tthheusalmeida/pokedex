<template>
  <div class="held">
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
  name: 'HeldItems',
  components: {
    DataTable,
  },
  data() {
    return {
      title: 'Held Items',
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

      return allheldItems.map((each) => ({ item: removeDashFromString(each.item) }));
    },
  },
};
</script>
