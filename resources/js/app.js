require('./bootstrap');

import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store/index'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

const vue = new Vue({
    router: router,
    store,
    el:"#app",
    render:h=>h(App)
})
