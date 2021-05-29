<template>
  <v-container
      class="information pr-5"
    >
      <v-row
        no-gutters
        class="ma-2"
        v-if="!isMobile"
      >
        <v-col cols="6">
          <PokeDetails />
        </v-col>

        <v-col cols="1"></v-col>

        <v-col cols="5">
          <PokeExploration />
        </v-col>
      </v-row>

      <v-col
        no-gutters
        class="ma-2"
        v-else
      >
        <PokeDetails />

        <v-divider class="grey lighten-3 mb-5"></v-divider>

        <PokeExploration />
      </v-col>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
