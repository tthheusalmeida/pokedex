<template>
  <div
    class="card"
    :style="getCardBackgroundColor(types[0])"
  >
    <div class="card_img">
      <img
      :src="img"
      :alt="name"
    >
    </div>

    <div class="card_id">
      n°{{ id }}
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
</template>

<script>
export default {
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
  methods: {
    getTypeStyle(type) {
      return `
        color: var(--${type}-type);
        background: var(--background-${type}-type);
      `;
    },
    getCardBackgroundColor(type) {
      if (type) {
        return `
          background: var(--background-${type}-type-2);
        `;
      }
      return 'background: var(--card-white);';
    },
  },
};

</script>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    align-content: center;

    font-family: 'Acme', arial;
    font-size: 0.8rem;
    text-transform: capitalize;
    padding: 10px;
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
      align-self: center;
    }

    &_id {
      margin-top: 5px;
      width: 50px;
      padding: 1px 6px;
      border-radius: 8px;
      background: var(--card-gray);
    }

    &_name {
      font-size: 16px;
      font-weight: bold;
      margin: 3px 0;
    }

    &_types {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: calc(5vmin + 2px);

      .type {
        text-align: center;
        display: inline;
        border-radius: 5px;
        padding: 2px 5px;
      }
    }
  }

  .card:hover {
    transform: translateY(-10px);
  }
</style>
