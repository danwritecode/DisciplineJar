import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from './store'
import vuetify from './plugins/vuetify';

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
