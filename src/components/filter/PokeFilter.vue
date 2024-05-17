<template>
  <div class="poke-filter">
    <div class="poke-filter__search">
      <input
        v-model="searchPokemon"
        ref="pokeFilterSearch"
        :placeholder="searchPokemonLabel"
      />

      <span class="material-symbols-outlined search">
        search
      </span>

      <span
        v-if="searchPokemon"
        @click="clearFitler"
        class="material-symbols-outlined close"
      >
        close
      </span>
    </div>

    <div class="poke-filter__select">
      <select v-model="selected">
        <option
          v-for="(option, index) in selectPokemonGeneration"
          :value="option.value"
          :key="index"
          class="poke-filter__select--option"
        >
          {{ option.text }}
        </option>
      </select>

      <span class="material-symbols-outlined globe">
        globe
      </span>

      <span
        v-if="!selected"
        class="poke-filter__placeholder"
      >
        Select Generation
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { removeDashFromString } from '@/utils/formatter';

export default {
  name: 'PokeFilter',
  data() {
    return {
      searchPokemonLabel: 'Search Pokémon',
      searchPokemon: '',
      selected: '',
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
    clearFitler() {
      this.searchPokemon = '';
      this.$refs.pokeFilterSearch.focus();
    },
  },
};
</script>

<style lang="css">
  .poke-filter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-self: center;
    padding: 8px;
    gap: 16px;
  }

  .poke-filter__search {
    position: relative;
  }

  .poke-filter__search input {
    width: 144px;
    height: 22px;
    max-height: 38px;
    padding: 8px 40px;
    border-radius: 4px;
    outline: inherit;
    border: none;
    font-family: 'Acme', arial;
    font-size: 16px;
    font-weight: 400;
  }

  .poke-filter__search .search,
  .poke-filter__search .close {
    display: block;
    position: absolute;
    top: 7px;
    left: 12px;
  }

  .poke-filter__search .close {
    left: 192px;
    cursor: pointer;
  }

  .poke-filter__select {
    position: relative;
  }

  .poke-filter__select select {
    width: 224px;
    height: 38px;
    border-radius: 4px;
    padding-left: 40px;
    outline: inherit;
    border: none;
    font-family: 'Acme', arial;
    font-size: 16px;
    font-weight: 400;
    appearance: none;
  }

  .poke-filter__select select:not(:active) {
    color: #757575;
  }

  .poke-filter__select--option:hover {
    box-shadow: 0 0 10px 100px var(--card-gray) inset;
  }

  .poke-filter__select .globe {
    display: block;
    position: absolute;
    top: 7px;
    left: 12px;
  }

  .poke-filter__placeholder {
    display: block;
    position: absolute;
    top: 10px;
    left: 42px;
    pointer-events: none;
    color: #757575;
  }

</style>
