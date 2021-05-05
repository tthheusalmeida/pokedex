<template>
  <div class="chart">
    <HighCharts
      :options="chartOptions"
    />
  </div>
</template>

<script>
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
    chartOptions() {
      const customOptions = {
        chart: {
          renderTo: 'container',
          polar: true,
          type: 'area',
          width: 350,
          height: 300,
          backgroundColor: '#032b07',
          animation: false,
        },
        title: {
          text: '',
        },
        pane: {
          size: '80%',
        },
        xAxis: {
          gridLineColor: '#60b165',
          categories: this.categories,
          tickmarkPlacement: 'on',
          lineWidth: 0,
          legend: false,
          labels: {
            style: {
              color: '#1b7e20',
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
