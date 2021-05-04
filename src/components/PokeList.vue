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
import Loading from '@/components/Loading.vue';
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
      const { id } = pokemon;
      const zero = 3 - id.toString().length + 1;
      return Array(+(zero > 0 && zero)).join('0') + id;
    },
    getPokemonName(pokemon) {
      return pokemon.name;
    },
    getPokemonTypes(pokemon) {
      return pokemon.types.map((types) => types.type.name);
    },
    getPokemonImg(pokemon) {
      return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${this.getPokemonId(pokemon)}.png`;
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
