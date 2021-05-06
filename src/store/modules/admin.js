//import authApi from '@/api/auth'
//import {setItem, getItem} from '@/helpers/persistanceStorage'
import adminApi from '@/api/admin'

const state = {
  data: null
}

export const mutationTypes = {
  getDataSuccess: '[admin] Get data success'
}

export const actionTypes = {
  getData: '[admin] Get data'
}

const mutations = {
  [mutationTypes.getDataSuccess](state, payload) {
    state.data = payload
  },
}

const actions = {
  [actionTypes.getData](context, {apiUrl}) {
    return new Promise(resolve => {
      //context.commit(mutationTypes.getFeedStart)
      adminApi.getApplicants(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getDataSuccess, response.data)
          resolve(response.data)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}