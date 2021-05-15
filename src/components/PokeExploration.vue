<template>
  <div class="exploration">
    <div class="exploration_display">
    </div>

    <div class="exploration_buttons d-flex flex-wrap justify-space-around">
      <div v-for="n in 10" :key="n">
        <v-btn
          :width="buttonSize.width"
          :height="buttonSize.height"
          elevation="10"
          color="blue lighten-1"
          class="exploration_buttons_button rounded-1"
        >
        </v-btn>
      </div>
    </div>

    <div>
      <Slices
        :options="slicesOptions"
      />
    </div>
  </div>
</template>

<script>
import Slices from '@/components/base/Slices.vue';

export default {
  name: 'PokeExploration',
  components: {
    Slices,
  },
  computed: {
    buttonSize() {
      const viewWidthToPixel = (value) => {
        if (this.isMobile) {
          return ((value - 1) * this.$vuetify.breakpoint.width) / 100;
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
};
</script>

<style lang="scss">
  .exploration {
    width: 100%;

    &_display {
      background: var(--card-black);
      height: 250px;
      border-radius: 4px;
      margin-bottom: 40px;
    }

    &_buttons {
      &_button {
        margin-bottom: calc(1vw - 5px);
      }
    }

  }

</style>
