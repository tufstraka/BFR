import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import VueParticles from 'vue-particles';
import firebase from 'firebase/app';
import VueMeta from 'vue-meta';
import 'firebase/auth';

Vue.use(Vue2Editor);
Vue.use(VueParticles);
Vue.use(VueMeta);


Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() =>{
  if(!app){
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})


