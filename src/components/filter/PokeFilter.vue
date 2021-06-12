<template>
  <v-row no-gutters>
    <div class="d-flex flex-wrap justify-center align-center">
      <div class="filter-field">
        <v-text-field
          solo
          dense
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          color="black"
          class="ma-2"
          v-model="searchPokemon"
          :label="searchPokemonLabel"
        />
      </div>

      <div class="filter-field">
        <v-select
          solo
          dense
          hide-details
          label="Select Generation"
          prepend-inner-icon="mdi-earth"
          color="black"
          class="ma-2"
          v-model="selected"
          :items="selectPokemonGeneration"
          :menu-props="{ top: false, offsetY: true }"
        ></v-select>
      </div>
    </div>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { removeDashFromString } from '@/utils/formatter';

export default {
  data() {
    return {
      searchPokemonLabel: 'Search Pokémon',
      searchPokemon: '',
      selected: { text: '', value: '' },
    };
  },
  watch: {
    selected() {
      this.registerPokemons(this.selected);
      this.searchPokemon = '';
    },
    searchPokemon() {
      if (this.searchPokemon) {
        const isNumber = Number(this.searchPokemon);

        if (isNumber) {
          const pokemonList = this.getPokemons
            .filter(({ id }) => id.toString().includes(this.searchPokemon.toString()));

          this.registerPokemonsTemp(pokemonList);
        }

        const pokemonList = this.getPokemons
          .filter(({ name }) => name.toLowerCase().includes(this.searchPokemon.toLowerCase()));

        this.registerPokemonsTemp(pokemonList);
      } else if (this.searchPokemon === null || this.searchPokemon === '') {
        this.registerPokemonsTemp(this.getPokemons);
      }
    },
  },
  computed: {
    ...mapGetters('pokemon', [
      'getRegions',
      'getPokemons',
    ]),
    selectPokemonGeneration() {
      const regions = this.getRegions.filter(({ name }) => name);

      const allRegions = regions
        .map(({ name }) => ({ text: removeDashFromString(name), value: name }));

      return allRegions;
    },
  },
  methods: {
    ...mapActions('pokemon', [
      'registerPokemons',
      'registerPokemonsTemp',
    ]),
  },
};
</script>

<style lang="scss">
  .filter-field {
    width: 240px;
  }

</style>
