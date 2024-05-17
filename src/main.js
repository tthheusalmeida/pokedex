import Vue from 'vue';
import Highcharts from 'highcharts';
import VueHighcharts from 'highcharts-vue';
import highchartsMore from 'highcharts/highcharts-more';
import App from './App.vue';
import router from './router';
import store from './store';

highchartsMore(Highcharts);
Vue.use(VueHighcharts, { Highcharts });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
