import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import logic from './logic/index.js';
import poster from './poster/index.js';

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    logic,
    poster
  }
})
