<template>
  <div class="loading">
    <div class="loading-dots">
      <div class="loading-dots__dot"></div>
      <div class="loading-dots__dot"></div>
      <div class="loading-dots__dot"></div>
    </div>
  </div>
</template>

<script>
export default {

};

</script>

<style lang="scss">
  .loading {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;

    width: calc(100vw);
  }

  .loading-dots {
    text-align: center;
    justify-content: center;

    padding: 10px;

    &__dot {
      animation: dot-keyframes 1.5s infinite ease-in-out;
      background-color: var(--pokelogo-yellow);
      border: 2px solid var(--pokelogo-blue);
      border-radius: 10px;
      display: inline-block;
      height: 10px;
      width: 10px;
      box-sizing: border-box;
      margin: 1.2px;

      &:nth-child(2) {
        animation-delay: .5s;
      }

      &:nth-child(3) {
        animation-delay: 1s;
      }
    }
  }

  @keyframes dot-keyframes {
  0% {
    opacity: .4;
    transform: scale(1, 1);
  }

  50% {
    opacity: 1;
    transform: scale(1.2, 1.2);
  }

  100% {
    opacity: .4;
    transform: scale(1, 1);
  }
}

</style>
