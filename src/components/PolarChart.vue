<template>
  <div>
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
        },
        title: {
          text: '',
        },
        pane: {
          size: '80%',
        },
        xAxis: {
          categories: this.categories,
          tickmarkPlacement: 'on',
          lineWidth: 0,
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
        },
        tooltip: {
          shared: true,
          valuePrefix: '',
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 100,
          layout: 'vertical',
        },
        series: [{
          name: 'Stats',
          data: this.series,
          pointPlacement: 'on',
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

<style>

</style>
