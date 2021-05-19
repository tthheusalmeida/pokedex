<template>
  <div class="exploration">
    <div class="exploration_display grey darken-4">
      <keep-alive>
        <component :is="currentDisplay"></component>
      </keep-alive>
    </div>

    <div class="exploration_buttons d-flex flex-wrap justify-space-around">
      <div v-for="(icon, index) in icons" :key="index">
        <v-btn
          fab
          :width="buttonSize.width"
          :height="buttonSize.height"
          elevation="10"
          color="blue lighten-1"
          class="exploration_buttons_button rounded-0 rounded"
          @click="currentDisplay = getDisplay(index)"
        >
          <v-icon color="grey lighten-4">
            mdi-{{ iconToExplorationButon(index) }}
          </v-icon>
        </v-btn>
      </div>
    </div>

    <div>
      <Slices :options="slicesOptions"/>
    </div>

    <div class="exploration_buttons_small d-flex justify-space-between pt-10">
      <div class="d-flex">
        <div v-for="n in 2" :key="n">
          <v-btn
            fab
            :width="buttonSize.width"
            :height="buttonSize.height"
            elevation="10"
            color="grey lighten-1"
            class="exploration_buttons_button disable-button rounded-0 rounded ma-1"
          >
          </v-btn>
        </div>
      </div>

      <div
        class="d-flex justify-center align-end pr-2"
      >
        <v-btn
          fab
          x-small
          color="yellow disable-button"
        >
        </v-btn>
      </div>
    </div>

    <div class="exploration_buttons_big d-flex justify-space-between pt-16">
      <div v-for="n in 2" :key="n">
        <v-btn
          fab
          :width="bigButtonSize.width"
          :height="bigButtonSize.height"
          elevation="10"
          color="grey darken-4"
          class="exploration_buttons_button rounded-0 rounded ma-1 disable-button"
        >
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Slices from '@/components/base/Slices.vue';
import Moves from '@/components/exploration/Moves.vue';
import HeldItems from '@/components/exploration/HeldItems.vue';

export default {
  name: 'PokeExploration',
  components: {
    Slices,
    Moves,
    HeldItems,
  },
  data() {
    return {
      currentDisplay: Moves,
      displays: [
        Moves,
        HeldItems,
      ],
      icons: [{
        name: 'Moves',
        icon: 'format-list-bulleted-square',
      },
      {
        name: 'Held Item',
        icon: 'hand-heart',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      },
      {
        name: '',
        icon: '',
      }],
    };
  },
  computed: {
    buttonSize() {
      const viewWidthToPixel = (value) => {
        if (this.isMobile) {
          return ((value + 9) * this.$vuetify.breakpoint.width) / 100;
        }
        if (this.isTable) {
          return ((value - 0.3) * this.$vuetify.breakpoint.width) / 100;
        }
        return (value * this.$vuetify.breakpoint.width) / 100;
      };

      const viewHeight = () => {
        if (this.isMobile) {
          return 35;
        }
        if (this.isTable) {
          return 80;
        }
        return 85;
      };

      return {
        width: `${viewWidthToPixel(7.5)}px`,
        height: `${viewHeight()}px`,
      };
    },
    bigButtonSize() {
      const viewWidthToPixel = (value) => {
        if (this.isMobile) {
          return ((value + 16) * this.$vuetify.breakpoint.width) / 100;
        }
        if (this.isTable) {
          return ((value - 0.3) * this.$vuetify.breakpoint.width) / 100;
        }
        return (value * this.$vuetify.breakpoint.width) / 100;
      };

      return {
        width: `${viewWidthToPixel(16)}px`,
        height: this.buttonSize.height,
      };
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isTable() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    slicesOptions() {
      return {
        styles: {
          slices: {
            justifyContent: 'flex-end',
            paddingTop: '10px',
            paddingRight: '4px',
          },
          single: {
            marginRight: '4px',
          },
        },
        colors: [
          'var(--card-black)',
          'var(--card-black)',
        ],
      };
    },
  },
  methods: {
    getDisplay(index) {
      return this.displays[index] ? this.displays[index] : this.currentDisplay;
    },
    iconToExplorationButon(index) {
      return this.icons[index].icon;
    },
    nameToExplorationButon(index) {
      return this.icons[index].name;
    },
  },
};
</script>

<style lang="scss">
  .exploration {
    width: 100%;

    &_display {
      height: 250px;
      border-radius: 4px;
      margin-bottom: 40px;
      padding: 10px;
      color: var(--card-white);
    }

    &_buttons {
      &_button {
        margin-bottom: calc(1vw - 5px);

        @media screen and (max-width: 800px) {
          margin-bottom: calc(2vw - 5px);
        }
      }
    }

  }

  .disable-button {
    pointer-events: none;
  }

</style>
