<template>
  <div class="text-center">
    <v-progress-circular
      :size="30"
      :color="color"
      indeterminate
    >
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  computed: {
    color() {
      return 'var(--pokelogo-yellow)';
    },
  },
};

</script>

<style lang="scss">
</style>
