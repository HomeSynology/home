import Vue from 'vue'
import Vuex from 'Vuex'
import * as syno from './modules/syno'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    syno
  }
})

export default store
