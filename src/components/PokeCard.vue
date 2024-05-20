<template>
  <div
    class="card"
    :style="backgroundColor(types[0])"
    @click="openPokemonDetails"
  >
    <div v-if="isThereData">
      <div
        class="card_id"
        :style="getBorderStyle(types[0])"
      >
        n°{{ id }}
      </div>

      <div
        class="card_img"
        :style="getBorderStyle(types[0])"
      >
        <img
          :src="img"
          :alt="name"
        >
      </div>

      <div class="card_name">
        {{ pokemonName }}
      </div>

      <div class="card_types">
        <div
          class="type"
          :style="getTypeStyle(type)"
          v-for="(type, index) in types" :key="index"
        >
          {{ type }}
        </div>
      </div>
    </div>

    <BaseLoading v-else/>
  </div>
</template>

<script>
import BaseLoading from '@/components/base/BaseLoading.vue';
import { removeDashFromString } from '@/utils/formatter';
import { getCardBackgroundColor, getSolidColor } from '@/utils/color';
import { mapActions } from 'vuex';

export default {
  name: 'PokeCard',
  components: {
    BaseLoading,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  computed: {
    isThereData() {
      return this.id && this.name && this.types && this.img;
    },
    pokemonName() {
      return removeDashFromString(this.name);
    },
  },
  methods: {
    ...mapActions('card', [
      'toggleDetails',
      'setPokemonDetails',
    ]),
    getTypeStyle(type) {
      if (!type) {
        return '';
      }

      // eslint-disable-next-line prefer-template
      return 'color: var(--' + type + '-type); background: var(--background-' + type + '-type)';
    },
    getBorderStyle(type) {
      // eslint-disable-next-line prefer-template
      return 'border: 2px solid var(--background-' + getSolidColor(type) + '-type);';
    },
    backgroundColor(type) {
      return getCardBackgroundColor(type);
    },
    openPokemonDetails() {
      this.setPokemonDetails({ id: this.id });
      this.toggleDetails();
    },
  },
};

</script>

<style lang="css">
  .card {
    display: flex;
    flex-direction: column;
    align-content: center;

    font-size: 0.8rem;
    text-transform: capitalize;
    line-height: 1;
    padding: 8px;
    margin: 8px;
    width: 150px;

    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .card_img {
    background: var(--card-gray);
    border-radius: 200%;
    min-width:  var(--image-size);
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .card_img img {
    width: var(--image-size);
    min-width: var(--image-size);
    min-height: var(--image-size);
  }

  .card_id, .card_name {
    text-align: center;
  }

  .card_id {
    margin: 5px 42px 5px;
    padding: 3px 6px;
    border-radius: 8px;
    align-content: flex-start;
    background: var(--card-gray);
  }

  .card_name {
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0 6px 0;
  }

  .card_types {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card_types:hover {
    transform: scale(1.1);
  }

  .card_types .type {
    text-align: center;
    display: inline;
    border-radius: 5px;
    padding: 4px 8px;
  }

</style>
