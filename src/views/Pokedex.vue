<template>
  <div class="container">
    <h1 class="title">
      Pokédex
    </h1>

    <PokeList />
  </div>
</template>

<script>
import PokeList from '@/components/PokeList.vue';

export default {
  name: 'Pokedex',
  components: {
    PokeList,
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

    font-size: 3rem;
    color: var(--pokelogo-yellow);
    text-shadow:
      -5px 0 var(--pokelogo-blue),
      0 5px var(--pokelogo-blue),
      5px 0 var(--pokelogo-blue),
      0 -5px var(--pokelogo-blue);
  }

</style>
