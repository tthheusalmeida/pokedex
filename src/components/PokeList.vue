<template>
  <v-row no-gutters class="pokelist">
    <v-col>
      <v-row no-gutters class="pr-4">
        <v-col no-gutters>
          <div class="d-flex flex-wrap justify-center align-center">
            <div class="search-field">
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

            <div>
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
          <v-row
            no-gutters
            class="pokemons d-flex flex-wrap justify-center mt-3"
          >
            <div
              v-for="(pokemon, index) in pokemons" :key="index"
            >
              <PokeCard
                :id="getPokemonId(pokemon)"
                :name="getPokemonName(pokemon)"
                :types="getPokemonTypes(pokemon)"
                :img="getPokemonImg(pokemon)"
                class="ma-2"
              />
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import { addZerosToNumber, removeDashFromString } from '@/utils/formatter';
import { getImgLowQuality } from '@/utils/img';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PokeList',
  components: {
    PokeCard,
  },
  data() {
    return {
      searchPokemonLabel: 'Search Pokémon',
      searchPokemon: '',
      selected: 1,
    };
  },
  async updated() {
    await this.getPokemonIdsArray(this.selected);
  },
  computed: {
    ...mapGetters('pokemon', [
      'getRegions',
      'getPokemons',
    ]),
    pokemons() {
      if (this.searchPokemon) {
        const isNumber = Number(this.searchPokemon);

        if (isNumber) {
          return this.getPokemons
            .filter(({ id }) => id.toString().includes(this.searchPokemon.toString()));
        }

        return this.getPokemons
          .filter(({ name }) => name.toLowerCase().includes(this.searchPokemon.toLowerCase()));
      }

      return this.getPokemons;
    },
    selectPokemonGeneration() {
      const regions = this.getRegions.filter(({ name }) => name);

      const allRegions = regions
        .map(({ name, id }) => ({ text: removeDashFromString(name), value: id }));

      return allRegions;
    },
  },
  watch: {
    selected() {
      this.registerPokemons(this.selected);
    },
  },
  methods: {
    ...mapActions('pokemon', [
      'registerPokemons',
      'getPokemonIdsArray',
    ]),
    getPokemonId(pokemon) {
      return addZerosToNumber(pokemon);
    },
    getPokemonName(pokemon) {
      return pokemon.name;
    },
    getPokemonTypes(pokemon) {
      return pokemon.types.map((types) => types.type.name);
    },
    getPokemonImg(pokemon) {
      return getImgLowQuality(pokemon) || '';
    },
  },
};

</script>

<style lang="scss">
  .pokelist {
    min-height: 74vh;
  }

  .search-field {
    width: 260px;
  }

  .loading {
    height: 74vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
