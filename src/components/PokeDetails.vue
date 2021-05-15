<template>
  <section class="details">
    <div
      class="details_header headline grey lighten-3"
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

    <div class="details_display grey lighten-3">
      <v-card-title
        class="details_display_info"
        :style="backgroundColor(getPokemonTypes[0])"
      >
        <h3 class="details_display_id">
          n°{{ getPokemonId }}
        </h3>
        <h3 class="details_display_name">
          {{ getPokemonName }}
        </h3>
      </v-card-title>

      <div
        class="details_display_img"
        :style="backgroundColor(getPokemonTypes[0])"
      >
        <v-img
          width="50vw"
          :max-width="imgSize"
          :src="getPokemonImg"
        ></v-img>
      </div>

      <div
        class="details_display_types"
        :style="backgroundColor(getPokemonTypes[0])"
      >
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
          disabled
          :large="!isMobile"
          elevation="10"
          class="grey darken-4"
        >
        </v-btn>
      </div>

      <div class="mr-2">
        <div class="details_info_slices">
          <div class="details_info_slices_one"></div>
          <div class="details_info_slices_two"></div>
        </div>

        <div
          v-show="!toogleInfo"
          class="details_info_stats"
        >
          <PokeAttributes
            :attributes="getPokemonAttributes"
          />
        </div>

        <div
          v-show="toogleInfo"
          class="details_info_attributes"
        >
          <PolarChart
            :categories="statsCategories"
            :series="statsSeries"
            :custom-options="statsOptions"
          />
        </div>
      </div>

      <div class="details_info_buttons">
        <v-btn
          fab
          :height="bottonSize.height"
          :width="bottonSize.width"
          elevation="10"
          class="grey darken-4 rounded-0 rounded-t-lg"
          @click.prevent="toggleDetailsInfo"
        >
        </v-btn>

        <div class="details_info_buttons_mid">
          <v-btn
            fab
            :height="bottonSize.height"
            :width="bottonSize.width"
            elevation="10"
            class="grey darken-4 rounded-0 rounded-l-lg"
            @click.prevent="previousPokemon"
          >
          </v-btn>

          <v-btn
            fab
            :height="bottonSize.height"
            :width="bottonSize.width"
            elevation="10"
            class="grey darken-4 rounded-0 disable-button"
          >
          </v-btn>

          <v-btn
            fab
            :height="bottonSize.height"
            :width="bottonSize.width"
            elevation="10"
            class="grey darken-4 rounded-0 rounded-r-lg"
            @click.prevent="nextPokemon"
          >
          </v-btn>
        </div>

        <v-btn
          fab
          :height="bottonSize.height"
          :width="bottonSize.width"
          elevation="10"
          class="grey darken-4 rounded-0 rounded-b-lg"
          @click.prevent="toggleDetailsInfo"
        >
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import PolarChart from '@/components/PolarChart.vue';
import PokeAttributes from '@/components/PokeAttributes.vue';
import { addZerosToNumber } from '@/utils/formatter';
import { getCardBackgroundColor, getSolidColor } from '@/utils/color';
import { getImgHighQuality } from '@/utils/img';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PokeDetails',
  components: {
    PolarChart,
    PokeAttributes,
  },
  data() {
    return {
      toogleInfo: false,
      pokemonId: '',
    };
  },
  created() {
    this.pokemonId = Number(this.getPokemonDetails.id);
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
        .filter((pokemon) => pokemon.id === this.pokemonId)[0];
    },
    getPokemonId() {
      return addZerosToNumber(this.pokemon);
    },
    getPokemonName() {
      return this.pokemon.name;
    },
    getPokemonImg() {
      return getImgHighQuality(this.pokemon);
    },
    getPokemonAttributes() {
      // eslint-disable-next-line prefer-const
      let attribute = [];

      attribute.push({ name: 'base experience', value: this.pokemon.base_experience });
      attribute.push({ name: 'height', value: this.pokemon.height });
      attribute.push({ name: 'weight', value: this.pokemon.weight });
      attribute.push({ name: 'abilities', value: this.pokemon.abilities });

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
    statsOptions() {
      const maxValues = [...this.statsSeries];
      const max = Math.round(maxValues
        ?.sort((a, b) => a - b)
        ?.reverse()
        ?.shift() / 10) * 10;

      return {
        yAxis: {
          max,
        },
      };
    },
    imgSize() {
      return this.isMobile ? '200px' : '300px';
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    bottonSize() {
      if (this.isMobile) {
        return {
          width: 23,
          height: 23,
        };
      }

      return {
        width: 28,
        height: 28,
      };
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
    backgroundColor(type) {
      return getCardBackgroundColor(getSolidColor(type));
    },
    nextPokemon() {
      // eslint-disable-next-line no-plusplus
      const nextId = this.pokemonId + 1;

      const isThereNextPokemon = this.getPokemons
        .filter((pokemon) => pokemon.id === nextId)[0];

      this.pokemonId = isThereNextPokemon
        ? nextId
        : this.getPokemons[0].id;
    },
    previousPokemon() {
      // eslint-disable-next-line no-plusplus
      const previousId = this.pokemonId - 1;

      const isTherePreviousPokemon = this.getPokemons
        .filter((pokemon) => pokemon.id === previousId)[0];

      const lastIndex = this.getPokemons.length - 1;
      this.pokemonId = isTherePreviousPokemon
        ? previousId
        : this.getPokemons[lastIndex].id;
    },
  },
};
</script>

<style lang="scss">
  .details {
    text-transform: capitalize;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;

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
      padding: 0 25px 25px;
      border-radius: 0 0 8px 8px;
      margin-bottom: 20px;
      box-shadow: var(--card-black) 0px 4px 4px -3px;

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
        padding: 5px;

        &_single {
          text-align: center;
          display: inline;
          width: 100%;
          padding: 4px 0;
          margin: 8px;
          border-radius: 15px;
        }
      }
    }

    &_info {
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      &_slices {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 40px;

        &_one,
        &_two {
          width: calc(10vw - 10px);
          max-width: 150px;
          padding: 8px 10px;
          border-radius: 12px;
          box-shadow: var(--card-black) 0px 2px 7px -2px;

          @media screen and (max-width: 700px) {
            width: 70px;
          }
        }

        &_one {
          background: var(--darker-ruby-red);
        }

        &_two {
          background: var(--card-dark-blue);
        }
      }

      &_sound {
        margin: 10px;

        @media screen and (max-width: 700px) {
          margin: 0;
        }
      }

      &_stats{
      }

      &_attributes {
        display: flex;
        flex-direction: column;
        width: 360;
        height: 310;
      }

      &_buttons {
        widows: 95px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &_mid {
          display: flex;
          flex-direction: row;
        }
      }
    }
  }

  .disable-{
    pointer-events: none;
  }

</style>
