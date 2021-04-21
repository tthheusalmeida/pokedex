<template>
  <div class="card">
    <div class="card_img">
      <img
      :src="img"
      :alt="name"
    >
    </div>

    <div class="card_information">
      <p>n°{{ zeroPad(id) }}</p>
      <p>{{ name }}</p>
    </div>

    <div class="card_types">
      <div>
        type:
      </div>
      <ul>
        <li
          class="type"
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
      type: Number,
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
    zeroPad(id) {
      const zero = 3 - id.toString().length + 1;
      return Array(+(zero > 0 && zero)).join('0') + id;
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
    border: 3px solid var(--card-dark-blue);
    border-radius: 8px;
    box-shadow: 0 10px 6px -6px var(--card-black);

    transition: all 0.2s ease;

    &_img {
      display: flex;
      flex-direction: row;
      justify-content: center;
      background: var(--card-gray);
      border-radius: 8px;

      img {
        width: 80px;
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
