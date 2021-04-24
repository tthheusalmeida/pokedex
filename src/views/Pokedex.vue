<template>
  <div class="container">
    <div class="pokedex">
      <div class="pokedex_big-ball">
        <div class="pokedex_big-ball-outer">
          <div class="pokedex_big-ball-inner"></div>
        </div>
      </div>
    </div>

    <PokeList v-if="requestStatus"
      :pokemons="pokemons"
      :request-status="requestStatus"
    />
    <Loading v-else />

  </div>
</template>

<script>
import PokeList from '@/components/PokeList.vue';
import { fetchPokemonData } from '@/services/PokeApi';
import Loading from '@/components/Loading.vue';

export default {
  name: 'Pokedex',
  components: {
    PokeList,
    Loading,
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

  .pokedex {
    height: 220px;
    width: calc(100vw - 20px);
    border-bottom: solid 2px var(--card-black);
    margin-bottom: 10px;
    padding: 0;
    background: var(--darkest-ruby-red);

    &_big-ball-outer {
      height: 170px;
      width: 170px;
      position: absolute;
      top: 25px;
      left: 40px;
      border-radius: 100%;
      background: var(--card-white);
      box-shadow: var(--card-black) 0px 0px 20px;
    }

    &_big-ball-inner {
      height: 150px;
      width: 150px;
      position: absolute;
      top: 10px;
      left: 10px;
      border-radius: 100%;
      background: var(--background-ice-type-2);
      box-shadow: var(--pokelogo-blue) 0px -80px 60px 10px inset,
                var(--pokelogo-blue) 0px 8px 20px 10px inset;
    }
  }

</style>
