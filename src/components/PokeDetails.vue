<template>
  <section class="details">
    <div class="details_header">
      <button
        class="details_header__button"
        @click="closePokemonDetails"
      >
        <span class="material-symbols-outlined button_icon">
          keyboard_return
        </span>
      </button>
    </div>

    <div class="details_display">
      <div
        class="details_display_info"
        :style="backgroundColor(getPokemonTypes[0])"
      >
        <h3 class="details_display_id">
          n°{{ getPokemonId }}
        </h3>
        <h3 class="details_display_name">
          {{ getPokemonName }}
        </h3>
      </div>

      <div
        class="details_display_img"
        :style="backgroundColor(getPokemonTypes[0])"
      >
        <img
          :style="getImageSizes(imgSize)"
          :src="getPokemonImg"
        >
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
        <div></div>
      </div>

      <div style="margin-right: 8px !important;">
        <Slices :options="slicesOptions"/>

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
        <div
          :height="buttonSize.height"
          :width="buttonSize.width"
          class="button_top"
          @click.prevent="toggleDetailsInfo"
        ></div>

        <div class="details_info_buttons_mid">
          <div
            :height="buttonSize.height"
            :width="buttonSize.width"
            class="button_left"
            @click.prevent="previousPokemon"
          ></div>
          <div
            :height="buttonSize.height"
            :width="buttonSize.width"
            class="button_mid"
          ></div>
          <div
            :height="buttonSize.height"
            :width="buttonSize.width"
            class="button_right"
            @click.prevent="nextPokemon"
          ></div>
        </div>

        <div
          :height="buttonSize.height"
          :width="buttonSize.width"
          class="button_bottom"
          @click.prevent="toggleDetailsInfo"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import PolarChart from '@/components/PolarChart.vue';
import PokeAttributes from '@/components/PokeAttributes.vue';
import Slices from '@/components/base/Slices.vue';
import { addZerosToNumber, removeDashFromString } from '@/utils/formatter';
import { getCardBackgroundColor, getSolidColor } from '@/utils/color';
import { getImgHighQuality } from '@/utils/img';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PokeDetails',
  components: {
    PolarChart,
    PokeAttributes,
    Slices,
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
      return removeDashFromString(this.pokemon.name);
    },
    getPokemonImg() {
      return getImgHighQuality(this.pokemon);
    },
    getPokemonAttributes() {
      return [
        { name: 'base experience', value: this.pokemon.base_experience },
        { name: 'height', value: this.pokemon.height },
        { name: 'weight', value: this.pokemon.weight },
        { name: 'abilities', value: this.pokemon.abilities },
      ];
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
      return '240px';
    },
    isMobile() {
      return false;
    },
    buttonSize() {
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
    slicesOptions() {
      return {
        styles: {
          slices: {
            justifyContent: 'space-around',
          },
        },
        colors: [
          'var(--darker-ruby-red)',
          'var(--card-dark-blue)',
        ],
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
      // eslint-disable-next-line prefer-template
      return 'color: var(--' + type + '-type); background: var(--background-' + type + '-type);';
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

      this.setPokemonDetails({ id: this.pokemonId });
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

      this.setPokemonDetails({ id: this.pokemonId });
    },
    getImageSizes(size) {
      // eslint-disable-next-line prefer-template
      return 'width: ' + size + ';'
      + ' max-width: ' + size + ';'
      + ' min-width: ' + size + ';'
      + ' min-height: ' + size + ';';
    },
  },
};
</script>

<style lang="css">
  .details {
    text-transform: capitalize;
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .details_header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-radius: 8px 8px 0 0;
    height: 50px;
    background-color: var(--card-white);
  }

  .details_header .details_header__button {
    background-color: var(--ruby-red);
    border-radius: 25px;
    border: 0;
    padding: 0;
    cursor: pointer;
    outline: none;
    box-shadow: var(--card-black) 0px 4px 4px -3px;
    margin-right: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button_icon {
    margin: 4px;
    background-color: transparent;
    color: var(--card-white) !important;
  }

  .details_display {
    padding: 0 25px 25px;
    border-radius: 0 0 8px 8px;
    margin-bottom: 20px;
    background-color: var(--card-white);
    box-shadow: var(--card-black) 0px 4px 4px -3px;
  }

  .details_display_info,
  .details_display_img,
  .details_display_types {
    display: flex;
    background: var(--card-white);
    padding: 0 16px 16px 16px;
  }

  .details_display_info {
    height: 50px;
    justify-content: space-between;
    border-radius: 3px 3px 0 0;
  }

  .details_display_img {
    flex-direction: row;
    justify-content: center;
  }

  .details_display_types {
    flex-direction: row;
    justify-content: space-around;
    border-radius: 0 0 3px 3px;
    padding: 5px;
  }

  .details_display_types_single {
    text-align: center;
    display: inline;
    width: 100%;
    padding: 4px 0;
    margin: 8px;
    border-radius: 15px;
  }

  .details_info {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
  }

  .details_info_sound {
    margin: 10px;
  }

  .details_info_sound div {
    width: 42px;
    height: 42px;
    border-radius: 25px;
    background-color: var(--card-black);
  }

  .details_attributes {
    display: flex;
    flex-direction: column;
    width: 360;
    height: 310;
  }

  .details_info_buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .details_buttons {
    widows: 95px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .details_buttons_mid {
    display: flex;
    flex-direction: row;
  }

  .disable-button{
    pointer-events: none;
  }

  .details_info_buttons_mid {
    display: flex;
  }

  .button_top,
  .button_left,
  .button_mid,
  .button_right,
  .button_bottom {
    width: 28px;
    height: 28px;
    background-color: var(--card-black);
    cursor: pointer;
  }

  .button_mi {
    cursor: inherit;
  }

  .button_top {
    border-radius: 8px 8px 0 0;
  }

  .button_left {
    border-radius: 8px 0 0 8px;
  }

  .button_right {
    border-radius: 0 8px 8px 0;
  }

  .button_bottom {
    border-radius: 0 0 8px 8px;
  }

</style>
