<template>
  <div class="pokelist">
    <div v-if="getRequestStatus">
      <div class="pokelist__content">
        <div v-for="(pokemon, index) in pokemons" :key="index">
          <PokeCard
            :id="getPokemonId(pokemon)"
            :name="getPokemonName(pokemon)"
            :types="getPokemonTypes(pokemon)"
            :img="getPokemonImg(pokemon)"
          />
        </div>
      </div>
    </div>

    <Loading class="loading" v-else />
  </div>
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

<style lang="css">
  .pokelist {
    min-height: 74vh;
  }

  .pokelist__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24px;
    padding: 0 8px;
  }

  .loading {
    height: 74vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
