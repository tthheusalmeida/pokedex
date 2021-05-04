<template>
  <div
    class="details"
  >
    <v-card>
      <v-card-actions
        class="headline grey lighten-1"
      >
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-4"
          class="ma-2 white--text"
          @click="closePokemonDetails"
        >
          Back
        </v-btn>
      </v-card-actions>

      <v-card-title
        class="d-flex justify-space-between text-capitalize"
      >
        <div class="details_id">
          n°{{ getPokemonId }}
        </div>
        <div class="details_name">
          {{ getPokemonName }}
        </div>
      </v-card-title>
      <v-divider></v-divider>

      <div class="d-flex flex-direction-row">
        <v-img
          width="60vw"
          max-width="300px"
          :src="getPokemonImg"
        ></v-img>

        <v-card-text>
          <div
            class="d-flex justify-space-between text-capitalize"
            v-for="attribute in getPokemonAttributes" :key="attribute.name"
          >
            <span class="font-weight-bold">{{ attribute.name }}</span>
            <span>{{ attribute.value }}</span>
          </div>

          <v-divider></v-divider>

          <div
            class="d-flex justify-space-between text-capitalize"
            v-for="status in getPokemonStatus" :key="status.name"
          >
            <span class="font-weight-bold">{{ status.name }}</span>
            <span>{{ status.value }}</span>
          </div>

          <v-divider></v-divider>

          <div
            class="d-flex justify-space-between text-capitalize"
            v-for="type in getPokemonTypes" :key="type"
          >
            <span >{{ type }}</span>
          </div>
        </v-card-text>
      </div>

    </v-card>
  </div>
</template>

<script>
import { addZerosToNumber } from '@/utils/formatter';
import { getImg } from '@/utils/img';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PokeDetails',
  computed: {
    ...mapGetters('card', [
      'getPokemonDetails',
    ]),
    ...mapGetters('pokemon', [
      'getPokemons',
    ]),
    pokemon() {
      return this.getPokemons
        .filter((pokemon) => pokemon.id === Number(this.getPokemonDetails.id))[0];
    },
    getPokemonId() {
      return addZerosToNumber(this.pokemon);
    },
    getPokemonName() {
      return this.pokemon.name;
    },
    getPokemonImg() {
      return getImg(this.getPokemonId);
    },
    getPokemonAttributes() {
      // eslint-disable-next-line prefer-const
      let attribute = [];

      attribute.push({ name: 'base experience', value: this.pokemon.base_experience });
      attribute.push({ name: 'height', value: this.pokemon.height });
      attribute.push({ name: 'weight', value: this.pokemon.weight });

      return attribute;
    },
    getPokemonStatus() {
      return this.pokemon.stats
        .map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        }));
    },
    getPokemonTypes() {
      return this.pokemon.types.map((types) => types.type.name);
    },
  },
  methods: {
    ...mapActions('card', [
      'toggleDetails',
      'setPokemonDetails',
    ]),
    closePokemonDetails() {
      this.toggleDetails();
      console.log('pokemon: ', this.pokemon);
      this.setPokemonDetails({});
    },
  },
};
</script>

<style lang="scss">
  .details {
    width: calc(100vw - 20px);
    padding-right: 20px;
  }
</style>
