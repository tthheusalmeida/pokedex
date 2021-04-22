<template>
  <div class="list">
    <div class="pokemon" v-for="(pokemon, index) in pokemons" :key="index">
      <PokeCard
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
      const pokemon1 = await fetchData(1);
      const pokemon2 = await fetchData(4);
      const pokemon3 = await fetchData(7);
      console.log('pokemon: ', pokemon1);
      this.pokemons.push(pokemon1);
      this.pokemons.push(pokemon2);
      this.pokemons.push(pokemon3);
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
