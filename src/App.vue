<template>
  <div id="app">
    <Pokedex />
  </div>
</template>

<script>
import Pokedex from '@/views/Pokedex.vue';

export default {
  name: 'App',
  components: {
    Pokedex,
  },
};

</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Acme');

  :root {
    --darkest-ruby-red: #9A2617;
    --darker-ruby-red: #AD2A1A;
    --ruby-red: #C02F1D;
    --lighter-ruby-red: #CD594A;

    --pokelogo-yellow: #FCCF00;
    --pokelogo-blue: #2468B1;

    --card-dark-blue: #003a70;
    --card-light-gray: #E8E8E8;

  }

  body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;
  }

  #app {
    font-family: 'Acme', arial;
    font-size: 1rem;
    font-weight: normal;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: calc(100%);
    min-height: calc(100vh - 20px);

    background: radial-gradient(
      var(--lighter-ruby-red),
      var(--darker-ruby-red),
      var(--darkest-ruby-red),
    );
  }

</style>
