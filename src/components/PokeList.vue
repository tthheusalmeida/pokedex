<template>
  <div class="list">
    <div class="pokemon" v-for="(pokemon, index) in pokemons[0]" :key="index">
      <PokeCard v-if="pokemon.id"
        :id="getPokemonId(pokemon)"
        :name="getPokemonName(pokemon)"
        :types="getPokemonTypes(pokemon)"
        :img="getPokemonImg(pokemon)"
      />
    </div>
  </div>
</template>

<script>
import PokeCard from '@/components/PokeCard.vue';
import { fetchData } from '@/services/PokeApi';

export default {
  name: 'PokeList',
  components: {
    PokeCard,
  },
  data() {
    return {
      pokemons: [],
    };
  },
  created() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
      // eslint-disable-next-line no-var
      var pokemonsRequest = [];
      for (let index = 1; index < 152; index += 1) {
        pokemonsRequest.push(fetchData(index));
      }

      await Promise.all(pokemonsRequest)
        .then((value) => this.pokemons.push(value));
    },
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
  }
  .pokemon {
    margin: 10px 5px;
  }
</style>
