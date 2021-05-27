//import authApi from '@/api/auth'
//import {setItem, getItem} from '@/helpers/persistanceStorage'
import adminApi from '@/api/admin'

const state = {
  data: null
}

export const mutationTypes = {
  getDataSuccess: '[admin] Get data success',
  setApplicationStatus: '[admin] Application status sat',
  setSettlementStatus: '[admin] Settlement status sat'
}

export const actionTypes = {
  getData: '[admin] Get data',
  setApplicationStatus: '[admin] Set application status',
  setSettlementStatus: '[admin] Set settlement status'
}

const mutations = {
  [mutationTypes.getDataSuccess](state, payload) {
    state.data = payload
  },
  [mutationTypes.setApplicationStatus](state, payload) {
    let applicationId = payload.applicationId
    let status = payload.status

    state.data.forEach(application => {
      if (application.id == applicationId) application.status = status
    })
  },
  [mutationTypes.setSettlementStatus](state, payload) {
    let applicationId = payload.applicationId
    let status = payload.status

    state.data.forEach(application => {
      if (application.id == applicationId)
        application.settlement.status = status
    })
  }
}

const actions = {
  [actionTypes.getData](context, {apiUrl}) {
    return new Promise(resolve => {
      //context.commit(mutationTypes.getFeedStart)
      adminApi.getApplicants(apiUrl).then(response => {
        context.commit(mutationTypes.getDataSuccess, response.data)
        resolve(response.data)
      })
    })
  },
  [actionTypes.setApplicationStatus](context, {applicationId, status}) {
    console.log('setApplicationStatus')
    return new Promise(resolve => {
      adminApi
        .setStatus({type: 'application', applicationId, status})
        .then(() => {
          context.commit(mutationTypes.setApplicationStatus, {
            applicationId,
            status
          })
          resolve(applicationId)
        })
    })
  },
  [actionTypes.setSettlementStatus](context, {applicationId, status}) {
    console.log('setSettlementStatus')
    return new Promise(resolve => {
      adminApi
        .setStatus({type: 'settlement', applicationId, status})
        .then(() => {
          context.commit(mutationTypes.setSettlementStatus, {
            applicationId,
            status
          })
          resolve(applicationId)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
