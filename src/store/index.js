import Vuex from 'Vuex'
import * as syno from './modules/syno'

const store = new Vuex.Store({
  modules: {
    syno
  }
})

export default store
