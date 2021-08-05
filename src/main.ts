import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

Vue.use(Vuetify);

(async function main() {
  await store.dispatch("fetchConfig");

  new Vue({
    vuetify: new Vuetify({
      theme: {},
    }),
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
})();
