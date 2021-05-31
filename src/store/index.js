import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import admin from '@/store/modules/admin'
import modal from '@/store/modules/modal'
import application from '@/store/modules/application'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    admin,
    modal,
    application
  }
})
