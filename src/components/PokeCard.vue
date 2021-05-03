<template>
  <div
    class="card"
    :style="getCardBackgroundColor(types[0])"
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
        {{ name }}
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

    <Loading v-else/>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import { getHexColorFromRoot } from '@/utils/color';
import { mapActions } from 'vuex';

export default {
  components: {
    Loading,
  },
  name: 'PokeCard',
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
  },
  methods: {
    ...mapActions('card', [
      'toggleDetails',
      'setPokemonDetails',
    ]),
    getCardBackgroundColor(type) {
      if (type) {
        const color = getHexColorFromRoot({
          type,
          isBackground: true,
          lighten: 32,
        });

        return `background: ${color};`;
      }
      return 'background: var(--card-white);';
    },
    getTypeStyle(type) {
      return `
        color: var(--${type}-type);
        background: var(--background-${type}-type);
      `;
    },
    getBorderStyle(type) {
      let newType = type;

      const typesWithMoreColors = [
        {
          type: 'flying',
          changeFor: 'water',
        },
        {
          type: 'ground',
          changeFor: 'electric',
        },
        {
          type: 'dragon',
          changeFor: 'ice',
        },
      ];

      const isMoreThenOneColor = typesWithMoreColors
        .filter((elem) => elem.type === type).shift();

      if (isMoreThenOneColor) {
        newType = isMoreThenOneColor.changeFor;
      }
      return `border: 2px solid var(--background-${newType}-type);`;
    },
    openPokemonDetails() {
      this.setPokemonDetails({ id: this.id });
      this.toggleDetails();
    },
  },
};

</script>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    align-content: center;

    font-size: 0.8rem;
    text-transform: capitalize;
    line-height: 1;
    padding: 8px;
    width: 150px;

    border-radius: 8px;
    box-shadow: var(--card-black) 0px 10px 15px -5px;

    cursor: pointer;
    transition: all 0.2s ease;

    &_img {
      background: var(--card-gray);
      border-radius: 100%;
      min-width: 130px;

      img {
        width: 130px;
      }
    }

    &_id, &_name {
      text-align: center;
    }

    &_id {
      margin: 5px 42px 5px;
      padding: 3px 6px;
      border-radius: 8px;
      align-content: flex-start;
      background: var(--card-gray);
    }

    &_name {
      font-size: 16px;
      font-weight: bold;
      margin: 8px 0 6px 0;
    }

    &_types {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .type {
        text-align: center;
        display: inline;
        border-radius: 5px;
        padding: 4px 8px;
      }
    }
  }

  .card:hover {
    transform: translateY(-10px);
  }
</style>
