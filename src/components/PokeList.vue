<template>
  <v-row no-gutters>
    <v-col v-if="getRequestStatus">
      <v-row class="pr-4">
        <v-col no-gutters>
          <div class="d-flex justify-center">
            <div class="search-field">
              <v-text-field
                solo
                dense
                clearable
                hide-details
                color="grey lighten-1"
                class="mt-2"
                v-model="searchPokemon"
                :label="searchPokemonLabel"
              />
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

    <Loading v-else />
  </v-row>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import Loading from '@/components/base/Loading.vue';
import { addZerosToNumber } from '@/utils/formatter';
import { getImgLowQuality } from '@/utils/img';
import { mapGetters } from 'vuex';

export default {
  name: 'PokeList',
  components: {
    PokeCard,
    Loading,
  },
  data() {
    return {
      searchPokemonLabel: 'Type the Pokémon name or id',
      searchPokemon: '',
    };
  },
  computed: {
    ...mapGetters('pokemon', [
      'getPokemons',
      'getRequestStatus',
    ]),
    requestStatus() {
      return this.getRequestStatus;
    },
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
  },
  methods: {
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
  .search-field {
    width: 260px;
  }
</style>
