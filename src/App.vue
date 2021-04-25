<template>
  <v-app>
    <div id="app">
      <Pokedex />
    </div>
  </v-app>
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
    --darkest-ruby-red: #7e2013;
    --darker-ruby-red: #AD2A1A;
    --ruby-red: #C02F1D;
    --lighter-ruby-red: #CD594A;

    --pokelogo-yellow: #FCCF00;
    --pokelogo-blue: #2468B1;

    --card-dark-blue: #003a70;
    --card-white: #FFFFFF;
    --card-gray: #E9E9E9;
    --card-black: #000000;

    --grass-type: #000000;
    --background-grass-type: #9BCC50;
    --poison-type: #FFFFFF;
    --background-poison-type: #b97fc9;
    --fire-type: #FFFFFF;
    --background-fire-type: #fd7d24;
    --water-type: #FFFFFF;
    --background-water-type: #4592c4;
    --flying-type: #000000;
    --background-flying-type: linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%);
    --bug-type: #FFFFFF;
    --background-bug-type: #729f3f;
    --normal-type: #000000;
    --background-normal-type: #a4acaf;
    --electric-type: #000000;
    --background-electric-type: #eed535;
    --ground-type: #000000;
    --background-ground-type: linear-gradient(180deg, #f7de3f 50%, #ab9842 50%);
    --fairy-type: #000000;
    --background-fairy-type: #fdb9e9;
    --fighting-type: #FFFFFF;
    --background-fighting-type: #d56723;
    --psychic-type: #FFFFFF;
    --background-psychic-type: #f366b9;
    --rock-type: #FFFFFF;
    --background-rock-type: #a38c21;
    --steel-type: #000000;
    --background-steel-type: #9eb7b8;
    --ice-type: #000000;
    --background-ice-type: #51c4e7;
    --ghost-type: #FFFFFF;
    --background-ghost-type: #7b62a3;
    --dragon-type: #FFFFFF;
    --background-dragon-type: linear-gradient(180deg, #53a4cf 50%, #f16e57 50%);
    --dark-type: #FFFFFF;
    --background-dark-type: #707070;

    --background-grass-type-2: #819760;
    --background-poison-type-2: #937f99;
    --background-fire-type-2: #db9d71;
    --background-water-type-2: #7daece;;
    --background-flying-type-2: linear-gradient(180deg, #8ee6ff 50%, #ffe6e0 50%);
    --background-bug-type-2: #97b96f;
    --background-normal-type-2: #baccd3;
    --background-electric-type-2: #cfc790;
    --background-ground-type-2: linear-gradient(180deg, #d4cc92 50%, rgb(185, 176, 133) 50%);
    --background-fairy-type-2: #c08cb0;
    --background-fighting-type-2: #f8b58c;
    --background-psychic-type-2: #dd9dc2;
    --background-rock-type-2: #c2b474;
    --background-steel-type-2: #daeff0;
    --background-ice-type-2: #b0edff;
    --background-ghost-type-2: #d0bfeb;
    --background-dragon-type-2: linear-gradient(180deg, #99bacc 50%, #bb9a95 50%);
    --background-dark-type-2: #b3b3b3;
  }

  body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;
  }

  #app {
    font-size: 1rem;
    font-weight: normal;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: 100vh;

    background: var(--ruby-red);
  }

</style>
