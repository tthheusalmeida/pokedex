<template>
  <div class="container">
    <h1 class="title">
      Pokédex
    </h1>

    <PokeList
      v-if="requestStatus"
      :pokemons="pokemons"
      :request-status="requestStatus"
    />

    <div v-else >
      <h1 class="title" >Loading...</h1>
    </div>
  </div>
</template>

<script>
import PokeList from '@/components/PokeList.vue';
import { fetchPokemonData } from '@/services/PokeApi';

export default {
  name: 'Pokedex',
  components: {
    PokeList,
  },
  data() {
    return {
      pokemons: [],
      requestStatus: false,
    };
  },
  created() {
    this.getPokemonData();
  },
  methods: {
    async getPokemonData() {
      // eslint-disable-next-line no-var
      var pokemonsRequest = [];
      this.requestStatus = false;
      for (let index = 1; index < 152; index += 1) {
        pokemonsRequest.push(fetchPokemonData(index));
      }

      await Promise.all(pokemonsRequest)
        .then((value) => this.pokemons.push(value));
      this.pokemons = this.pokemons.shift();

      this.requestStatus = true;
    },
  },
};
</script>

<style lang="scss">
  .container {
    min-width: calc(90vw);

    ul {
      margin: 0;
      padding: 0;
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;

    font-size: 4rem;
    color: var(--pokelogo-yellow);
    text-shadow:
      -5px 0 var(--pokelogo-blue),
      0 5px var(--pokelogo-blue),
      5px 0 var(--pokelogo-blue),
      0 -5px var(--pokelogo-blue);
  }

</style>
