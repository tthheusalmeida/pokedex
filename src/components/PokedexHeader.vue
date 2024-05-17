<template>
  <div class="pokedex-header">
    <div class="pokedex-header__big-ball">
      <div class="pokedex-header__big-ball-outer">
        <div class="pokedex-header__big-ball-outer__small-ball-red"></div>
        <div class="pokedex-header__big-ball-outer__small-ball-yellow"></div>
        <div class="pokedex-header__big-ball-outer__small-ball-green"></div>
        <div class="pokedex-header__big-ball-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokedexHeader',
};
</script>

<style lang="css">
  .pokedex-header {
    height: 150px;
    width: calc(100vw - 16px);
    padding: 0;
    background: var(--darkest-ruby-red);
  }

  .pokedex-header__big-ball {
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
  }

  .pokedex-header__big-ball-outer {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 25px;
    left: 40px;
    border-radius: 100%;
    background: var(--card-white);
  }

  .pokedex-header__big-ball-outer__small-ball-red,
  .pokedex-header__big-ball-outer__small-ball-yellow,
  .pokedex-header__big-ball-outer__small-ball-green {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    box-shadow: var(--darker-ruby-red) 0px -10px 10px 1px inset,
                var(--lighter-ruby-red) 0px 10px 35px 5px inset;
  }

  .pokedex-header__big-ball-outer__small-ball-red {
    position: absolute;
    left: 140px;
    box-shadow: var(--darker-ruby-red) 0px -10px 10px 1px inset,
                var(--lighter-ruby-red) 0px 10px 35px 5px inset;
  }

  .pokedex-header__big-ball-outer__small-ball-yellow {
    position: absolute;
    left: 210px;
    box-shadow: var(--background-rock-type) 0px -10px 10px 1px inset,
                var(--background-electric-type) 0px 10px 35px 5px inset;
  }

  .pokedex-header__big-ball-outer__small-ball-green {
    position: absolute;
    left: 280px;
    box-shadow: var(--background-bug-type) 0px -10px 10px 1px inset,
                var(--background-grass-type) 0px 10px 35px 5px inset;
  }

  .pokedex-header__big-ball-inner {
    height: 80px;
    width: 80px;
    position: absolute;
    top: 10px;
    left: 10px;
    border-radius: 100%;
    background: var(--card-white);
    box-shadow: var(--pokelogo-blue) 0px -40px 30px 10px inset,
              var(--pokelogo-blue) 0px 4px 10px 10px inset;
  }

</style>
