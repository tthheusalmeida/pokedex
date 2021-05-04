<template>
  <div class="details">
    <v-card class="rounded-lg">
      <v-card-actions
        class="details_header headline grey lighten-1"
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

      <div class="details_display grey lighten-1">
        <v-card-title
          class="details_display_info"
        >
          <h3 class="details_display_id">
            n°{{ getPokemonId }}
          </h3>
          <h3 class="details_display_name">
            {{ getPokemonName }}
          </h3>
        </v-card-title>

        <v-divider class="grey lighten-1"></v-divider>

        <div class="details_display_img">
          <v-img
            width="50vw"
            max-width="350px"
            :src="getPokemonImg"
          ></v-img>
        </div>
      </div>

      <div class="d-flex flex-direction-row">
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

    &_header {
    }

    &_display {
      padding: 0 60px 60px;

      &_info {
        display: flex;
        justify-content: space-between;
        text-transform: capitalize;
        background: var(--card-white);
        border-radius: 8px 8px 0 0;
      }

      &_img {
        display: flex;
        flex-direction: row;
        justify-content: center;
        background: var(--card-white);
        border-radius: 0 0 8px 8px;
      }

      &_buttons {

      }
    }

    &_status {

      &_buttons {

      }
    }
  }
</style>
