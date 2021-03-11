import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import vuetify from "@/plugins/vuetify";
import axios from "axios";
import VueCookies from "vue-cookies";
import "@/css/common.scss";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(VueCookies);
Vue.$cookies.config("4h");

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
