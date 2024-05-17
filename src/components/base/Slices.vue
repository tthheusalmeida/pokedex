<template>
  <div
    class="slices"
    :style="[slicesStyles]"
  >
    <div
      v-for="(color, index) in colors" :key="index"
      class="slices_single"
      :style="[sliceColor(color), singleStyle]">
    </div>
  </div>
</template>

<script>
/* eslint-disable prefer-const */
export default {
  name: 'Slices',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    colors() {
      return this.options.colors;
    },
    slicesStyles() {
      return this.options.styles.slices;
    },
    singleStyle() {
      return this.options.styles.single;
    },
  },
  methods: {
    sliceColor(color) {
      return {
        background: color,
      };
    },
  },
};
</script>

<style lang="css">
  .slices {
    display: flex;
    flex-direction: row;
    margin-bottom: 40px;
    justify-content: space-around;
  }
  .slices_single{
    width: calc(10vw - 10px);
    max-width: 150px;
    padding: 8px 10px;
    border-radius: 12px;
    box-shadow: var(--card-black) 0px 2px 7px -2px;

    @media screen and (max-width: 700px) {
      width: 70px;
    }
  }
</style>
