<template>
  <div>
    <div
      v-if="getRequestStatus"
      class="list"
    >
      <div class="pokemon" v-for="(pokemon, index) in getPokemons" :key="index">
        <PokeCard
          :id="getPokemonId(pokemon)"
          :name="getPokemonName(pokemon)"
          :types="getPokemonTypes(pokemon)"
          :img="getPokemonImg(pokemon)"
        />
      </div>
    </div>

    <Loading v-else />
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
      'getPokemons',
      'getRequestStatus',
    ]),
    requestStatus() {
      return this.getRequestStatus;
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
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 15px;
  }

  .pokemon {
    margin: 10px 5px;
  }
</style>
