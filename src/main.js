import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

let app;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
