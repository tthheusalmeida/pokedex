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
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    chartOptions() {
      let width = 350;
      let height = 300;
      let size = '80%';

      if (this.isMobile) {
        width = 220;
        height = 200;
        size = '60%';
      }

      const customOptions = {
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
      return customOptions;
    },
  },
};
</script>

<style lang="scss">
  .chart {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

</style>
