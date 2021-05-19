<template>
  <div class="pokedex">
    <div class="pokedex_big-ball">
      <div class="pokedex_big-ball-outer">
        <div class="pokedex_big-ball-outer_small-ball-red"></div>
        <div class="pokedex_big-ball-outer_small-ball-yellow"></div>
        <div class="pokedex_big-ball-outer_small-ball-green"></div>
        <div class="pokedex_big-ball-inner"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss">
  .pokedex {
    height: 210px;
    width: 100vw;
    padding: 0;
    background: var(--darkest-ruby-red);

    @media screen and (max-width: 800px) {
      height: 150px;
    }

    &_big-ball {
      padding: 0;
      margin: 0;
      position: absolute;
      left: 0;
      top: 0;
    }

    &_big-ball-outer {
      height: 170px;
      width: 170px;
      position: absolute;
      top: 25px;
      left: 40px;
      border-radius: 100%;
      background: var(--card-white);

      @media screen and (max-width: 800px) {
        height: 100px;
        width: 100px;
      }

      &_small-ball-red,
      &_small-ball-yellow,
      &_small-ball-green {
        height: 40px;
        width: 40px;
        border-radius: 100%;
        box-shadow: var(--darker-ruby-red) 0px -10px 10px 1px inset,
                    var(--lighter-ruby-red) 0px 10px 35px 5px inset;

        @media screen and (max-width: 800px) {
          height: 30px;
          width: 30px;
        }
      }

      &_small-ball-red {
        position: absolute;
        left: 200px;
        box-shadow: var(--darker-ruby-red) 0px -10px 10px 1px inset,
                    var(--lighter-ruby-red) 0px 10px 35px 5px inset;

        @media screen and (max-width: 800px) {
          left: 140px;
        }
      }

      &_small-ball-yellow {
        position: absolute;
        left: 300px;
        box-shadow: var(--background-rock-type) 0px -10px 10px 1px inset,
                    var(--background-electric-type) 0px 10px 35px 5px inset;

        @media screen and (max-width: 800px) {
          left: 210px;
        }
      }

      &_small-ball-green {
        position: absolute;
        left: 400px;
        box-shadow: var(--background-bug-type) 0px -10px 10px 1px inset,
                    var(--background-grass-type) 0px 10px 35px 5px inset;

        @media screen and (max-width: 800px) {
          left: 280px;
        }
      }
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

      @media screen and (max-width: 800px) {
        height: 80px;
        width: 80px;
        box-shadow: var(--pokelogo-blue) 0px -40px 30px 10px inset,
                var(--pokelogo-blue) 0px 4px 10px 10px inset;
      }
    }
  }

</style>
