<template>
  <v-row no-gutters class="pokelist">
    <v-col no-gutters v-if="getRequestStatus">
      <v-row no-gutters>
        <v-col no-gutters>
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

    <Loading class="loading" v-else />
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
  computed: {
    ...mapGetters('pokemon', [
      'getRegions',
      'getPokemonsTemp',
      'getRequestStatus',
    ]),
    requestStatus() {
      return this.getRequestStatus;
    },
    pokemons() {
      return this.getPokemonsTemp;
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
  .pokelist {
    min-height: 74vh;
  }

  .loading {
    height: 74vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
