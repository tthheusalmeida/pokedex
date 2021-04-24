<template>
  <div class="pokedex">
      <div class="pokedex_big-ball">
          <div class="mid"></div>
        <div class="inline">
          <div class="back-left"></div>
          <div class="back-right"></div>
        </div>
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
    height: 220px;
    width: calc(100vw - 20px);
    margin-bottom: 10px;
    padding: 0;
    background: transparent;

    &_big-ball-outer {
      height: 170px;
      width: 170px;
      position: absolute;
      top: 25px;
      left: 40px;
      border-radius: 100%;
      background: var(--card-white);
      //box-shadow: var(--card-black) 0px 0px 20px;

      &_small-ball-red {
        height: 40px;
        width: 40px;
        position: absolute;
        left: 250px;
        border-radius: 100%;
        box-shadow: var(--darker-ruby-red) 0px -10px 10px 1px inset,
                    var(--lighter-ruby-red) 0px 10px 35px 5px inset;
        }

      &_small-ball-yellow {
        height: 40px;
        width: 40px;
        position: absolute;
        left: 350px;
        border-radius: 100%;
        box-shadow: var(--background-rock-type) 0px -10px 10px 1px inset,
                    var(--background-electric-type) 0px 10px 35px 5px inset;
        }

      &_small-ball-green {
        height: 40px;
        width: 40px;
        position: absolute;
        left: 450px;
        border-radius: 100%;
        box-shadow: var(--background-grass-type-2) 0px -10px 10px 1px inset,
                    var(--background-grass-type) 0px 10px 35px 5px inset;
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
    }
  }

  .inline {
    display: flex;
    flex-direction: row;

  }

  .back-left {
    height: 220px;
    width: 250px;
    background: var(--darkest-ruby-red);
    border-radius: 4px;
    box-shadow: var(--card-black) -3px 12px 3px -5px;
  }

  .mid {
    position: absolute;
    top: 1px;
    left: 247px;
    height: 220px;
    width: 400px;
    border-radius: 5px;
    background: var(--darkest-ruby-red);
    box-shadow: var(--card-black) -2px 12px 3px -5px;
    transform: translateY(-51px) translateX(-52px)  rotate(-16deg);
  }

  .back-right {
    height: 110px;
    width: calc(100vw - 250px);
    background: var(--darkest-ruby-red);
    box-shadow: var(--card-black) 2px 12px 5px -5px;
  }
</style>
