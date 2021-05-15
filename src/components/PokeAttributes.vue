<template>
  <div
    class="attributes"
  >
    <div>
      <div class="attributes_height">
        <h3>{{ height.name}}</h3>
        <div class="pl-2">{{ (height.value / 10).toFixed(1) }} m</div>
      </div>

      <div class="attributes_weight">
        <h3>{{ weight.name }}</h3>
        <div class="pl-2">{{ (weight.value/ 10).toFixed(1) }} kg</div>
      </div>

      <div class="attributes_base-experience">
        <h3>{{ baseExperience.name }}</h3>
        <div class="pl-2">{{ baseExperience.value }} xp</div>
      </div>

      <div class="attributes_abilities">
        <h3>{{ abilities.name }}</h3>
        <div class="attributes_abilities_component">
          <div
            v-for="(ability, index) in abilities.value" :key="index"
            class="pl-2"
          >
            {{ ability }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokeAttributes',
  props: {
    attributes: {
      type: Array,
      default: () => ([]),
    },
  },
  computed: {
    baseExperience() {
      return this.attributes.filter((attribute) => attribute.name === 'base experience').shift();
    },
    height() {
      return this.attributes.filter((attribute) => attribute.name === 'height').shift();
    },
    weight() {
      return this.attributes.filter((attribute) => attribute.name === 'weight').shift();
    },
    abilities() {
      const abilities = this.attributes
        .filter((attribute) => attribute.name === 'abilities').shift().value
        .map((value) => {
          // eslint-disable-next-line prefer-const
          let ability = value.ability.name;
          return ability;
        });

      return {
        name: 'abilities',
        value: abilities,
      };
    },
  },
};
</script>

<style lang="scss">
  .attributes {
    padding: 10px;
    width: 100%;
    min-width: calc(25vw);
    height: 250px;

    font-size: 14px;
    line-height: 2.0;
    color: #1fc022;
    background: #032b07;

    border: 5px solid var(--background-grass-type);
    border-radius: 5px;

    &_height,
    &_weight,
    &_base-experience,
    &_abilities {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      padding: 2px;
      justify-content: space-between;
      border-bottom: 2px dotted var(--background-grass-type);

      span {
        font-weight: bold;
      }
    }

    &_abilities {
      display: flex;
      flex-direction: row;
      align-items: flex-start;

      &_component {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
    }
  }

</style>
