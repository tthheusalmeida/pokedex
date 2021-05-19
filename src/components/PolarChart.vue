<template>
  <div class="chart">
    <HighCharts
      :options="chartOptions"
    />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { Chart } from 'highcharts-vue';
import merge from 'lodash/merge';

export default {
  name: 'PolarChart',
  components: {
    HighCharts: Chart,
  },
  props: {
    categories: {
      type: Array,
      default: () => ([]),
    },
    series: {
      type: Array,
      default: () => ([]),
    },
    customOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    isTable() {
      return this.$vuetify.breakpoint.mdAndDown;
    },
    chartOptions() {
      const height = 240;
      let width = this.viewWidthToPixel(24.5);
      let size = '80%';

      if (this.isMobile) {
        width = this.viewWidthToPixel(46.5);
        size = '40%';
      } else if (this.isTable) {
        width = this.viewWidthToPixel(23.5);
        size = '60%';
      }
      const options = {
        chart: {
          renderTo: 'container',
          polar: true,
          type: 'area',
          width,
          height,
          backgroundColor: '#032b07',
          animation: true,
        },
        plotOptions: {
          series: {
            animation: {
              duration: 1500,
            },
          },
        },
        title: {
          text: '',
        },
        pane: {
          size,
        },
        xAxis: {
          gridLineColor: '#60b165',
          categories: this.categories,
          tickmarkPlacement: 'on',
          lineWidth: 0,
          legend: false,
          labels: {
            style: {
              color: '#1fc022',
            },
          },
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          gridLineColor: '#60b165',
          lineWidth: 0,
          min: 0,
          labels: {
            style: {
              color: '#1fc022',
            },
          },
        },
        tooltip: {
          shared: true,
          valuePrefix: '',
        },
        legend: {
          enabled: false,
        },
        series: [{
          name: 'Stats',
          data: this.series,
          pointPlacement: 'on',
          color: '#1fc022',
        }],
        credits: {
          enabled: false,
        },
      };

      return merge({}, options, this.customOptions);
    },
  },
  methods: {
    viewWidthToPixel(vw) {
      return (vw * this.$vuetify.breakpoint.width) / 100;
    },
  },
};
</script>

<style lang="scss">
  .chart {
    display: flex;
    flex-direction: row;
    justify-content: center;

    border: 5px solid var(--background-grass-type);
    border-radius: 5px;
  }

</style>
