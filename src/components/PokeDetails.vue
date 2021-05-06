<template>
  <section class="details">
    <div
      class="details_header headline grey lighten-1"
    >
      <v-btn
        icon
        elevation="5"
        class="ma-2 red darken-4"
        @click="closePokemonDetails"
      >
        <v-icon color="white">
          mdi-keyboard-return
        </v-icon>
      </v-btn>
    </div>

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
          max-width="280px"
          :src="getPokemonImg"
        ></v-img>
      </div>

      <div class="details_display_types">
        <div
          class="details_display_types_single"
          :style="getTypeStyle(type)"
          v-for="(type) in getPokemonTypes" :key="type"
        >
          <span>{{ type }}</span>
        </div>
      </div>
    </div>

    <div class="details_info">
      <div class="details_info_sound">
        <v-btn
          icon
          large
          disabled
          elevation="10"
          class="grey darken-4"
        >
        </v-btn>
      </div>

      <div>
        <div class="details_info_slices">
          <div class="details_info_slices_one"></div>
          <div class="details_info_slices_two"></div>
        </div>

        <div
          v-if="toogleInfo"
          class="details_info_attributes"
        >
          <PolarChart
            :categories="attributeCategories"
            :series="attributeSeries"
          />
        </div>

        <div
          v-else
          class="details_info_stats"
        >
          <PolarChart
            :categories="statsCategories"
            :series="statsSeries"
          />
        </div>
      </div>

      <div class="details_info_buttons">
        <v-btn
          elevation="10"
          class="grey darken-4"
          @click="toggleDetailsInfo"
        >
          <v-icon color="white">
            mdi-arrow-left
          </v-icon>
        </v-btn>

        <v-btn
          elevation="10"
          class="grey darken-4"
          @click="toggleDetailsInfo"
        >
          <v-icon color="white">
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import PolarChart from '@/components/PolarChart.vue';
import { addZerosToNumber } from '@/utils/formatter';
import { getImg } from '@/utils/img';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PokeDetails',
  components: {
    PolarChart,
  },
  data() {
    return {
      toogleInfo: false,
    };
  },
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
      return getImg(this.pokemon);
    },
    getPokemonAttributes() {
      // eslint-disable-next-line prefer-const
      let attribute = [];

      attribute.push({ categorie: 'base experience', serie: this.pokemon.base_experience });
      attribute.push({ categorie: 'height', serie: this.pokemon.height });
      attribute.push({ categorie: 'weight', serie: this.pokemon.weight });

      return attribute;
    },
    getPokemonsStats() {
      return this.pokemon.stats
        .map((stat) => ({
          categorie: stat.stat.name,
          serie: stat.base_stat,
        }));
    },
    getPokemonTypes() {
      return this.pokemon.types.map((types) => types.type.name);
    },
    statsCategories() {
      return this.getPokemonsStats.map((stat) => stat.categorie);
    },
    statsSeries() {
      return this.getPokemonsStats.map((stat) => stat.serie);
    },
    attributeCategories() {
      return this.getPokemonAttributes.map((attribute) => attribute.categorie);
    },
    attributeSeries() {
      return this.getPokemonAttributes.map((attribute) => attribute.serie);
    },
  },
  methods: {
    ...mapActions('card', [
      'toggleDetails',
      'setPokemonDetails',
    ]),
    closePokemonDetails() {
      this.toggleDetails();
      this.setPokemonDetails({});
    },
    getTypeStyle(type) {
      return `
        color: var(--${type}-type);
        background: var(--background-${type}-type);
      `;
    },
    toggleDetailsInfo() {
      this.toogleInfo = !this.toogleInfo;
    },
  },
};
</script>

<style lang="scss">
  .details {
    text-transform: capitalize;
    margin-top: 20px;
    width: calc(100vw - 20px);
    padding-right: 20px;
    padding-bottom: 20px;
    border-radius: 8px;

    @media not screen and (max-width: 700px) {
      width: 650px;
    }

    &_header {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      border-radius: 8px 8px 0 0;
      height: 50px;
    }

    &_display {
      padding: 0 45px 45px;
      border-radius: 0 0 8px 8px;
      margin-bottom: 40px;

      &_info,
      &_img,
      &_types {
        display: flex;
        background: var(--card-white);
      }

      &_info {
        height: 50px;
        justify-content: space-between;
        border-radius: 3px 3px 0 0;
      }

      &_img {
        flex-direction: row;
        justify-content: center;
      }

      &_types {
        flex-direction: row;
        justify-content: space-around;
        border-radius: 0 0 3px 3px;

        &_single {
          text-align: center;
          display: inline;
          width: 100%;
          padding: 4px 8px;
          border-radius: 15px;
          border: 10px solid var(--card-white);
        }
      }
    }

    &_info {
      display: flex;
      flex-direction: row;

      &_slices {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 40px;

        &_one,
        &_two {
          width: 150px;
          padding: 8px 10px;
          border-radius: 12px;
          box-shadow: var(--card-black) 0px 2px 7px -2px;
        }

        &_one {
          background: var(--darker-ruby-red);
        }

        &_two {
          background: var(--card-dark-blue);
        }
      }

      &_stats,
      &_attributes {
        border: 5px solid var(--background-grass-type);
        border-radius: 5px;
      }

      &_sound {
        margin: 10px;
      }

      &_stats{
        width: 360;
        height: 310;
      }

      &_attributes {
        display: flex;
        flex-direction: column;
        width: 360;
        height: 310;
      }

      &_buttons {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }
  }
</style>
