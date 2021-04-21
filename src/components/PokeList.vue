<template>
  <div class="list">
    <div class="pokemon" v-for="pokemon in pokemons" :key="pokemon.id">
      <PokeCard
        :id="pokemon.id"
        :name="pokemon.name"
        :types="pokemon.type"
        :img="pokemon.img"
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
      pokemons: [
        {
          id: 1,
          name: 'bulbasaur',
          type: ['grass', 'poison'],
          img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
        },
        {
          id: 4,
          name: 'charmander',
          type: ['fire'],
          img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png',
        },
        {
          id: 7,
          name: 'squirtle',
          type: ['water'],
          img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
        },
      ],
      pokemonsData: [],
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
      this.pokemonsData.push(pokemon1);
      this.pokemonsData.push(pokemon2);
      this.pokemonsData.push(pokemon3);
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
