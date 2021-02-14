import Vue from 'vue'
import Vuex from 'vuex'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    user: state => {
      return state.user
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme
  }
})
