import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import firebase from 'firebase'
import "firebase/database";


Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBpYiLPIaP9sZ-DBDGqWGMfjQEfeZE8lnU",
  authDomain: "diet-app-c32ac.firebaseapp.com",
  databaseURL: "https://diet-app-c32ac-default-rtdb.firebaseio.com",
  projectId: "diet-app-c32ac",
  storageBucket: "diet-app-c32ac.appspot.com",
  messagingSenderId: "746821723409",
  appId: "1:746821723409:web:49e5458d30559d0f1a58b0"
};

firebase.initializeApp(firebaseConfig);

window.firebase=firebase;

const db = firebase.database();

export default db;

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
