import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import dict from './dict/index.js';
import ENV from './env/index.js';
import logic from './logic/index.js';
import poster from './poster/index.js';
import drawer from './drawer/index.js';

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
    dict,
    ENV,
    logic,
    poster,
    drawer
  }
})
