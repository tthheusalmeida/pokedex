import Vue from 'vue';
import Highcharts from 'highcharts';
import VueHighcharts from 'highcharts-vue';
import highchartsMore from 'highcharts/highcharts-more';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

highchartsMore(Highcharts);
Vue.use(VueHighcharts, { Highcharts });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
