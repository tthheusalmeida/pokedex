<template>
  <div class="card">
    <div class="card_img">
      <img
      :src="img"
      :alt="name"
    >
    </div>

    <div class="card_information">
      <p>n°{{ id }}</p>
      <p>{{ name }}</p>
    </div>

    <div class="card_types">
      <div>
        type:
      </div>
      <ul>
        <li
          class="type"
          :style="getTypeStyle(type)"
          v-for="(type, index) in types" :key="index"
        >
          {{ type }}
        </li>
      </ul>
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
  },
};

</script>

<style lang="scss">
  .card {
    font-size: 0.8rem;
    text-transform: capitalize;
    padding: 10px;
    width: 150px;

    background: var(--card-white);
    border-radius: 8px;
    box-shadow: var(--card-black) 0px 10px 15px -5px;

    transition: all 0.2s ease;

    &_img {
      display: flex;
      flex-direction: row;
      justify-content: center;
      background: var(--card-gray);
      border-radius: 8px;
      min-width: 130px;

      img {
        width: 130px;
      }
    }

    &_information {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 8px;

      p {
        padding: 0;
        margin: 0;
      }
    }

    &_types {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 4px;

      ul {
        list-style-type:none;
      }

      .type {
        display: inline;
        margin-left: 8px;
        color: white;
        background: magenta;
        border-radius: 5px;
        padding: 2px 5px;
      }
    }
  }

  .card:hover {
    transform: translateY(-10px);
  }
</style>
