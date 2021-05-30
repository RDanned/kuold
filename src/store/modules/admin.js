//import authApi from '@/api/auth'
//import {setItem, getItem} from '@/helpers/persistanceStorage'
import adminApi from '@/api/admin'

const state = {
  data: [],
  searchString: null,
  sortApplications: {
    by: 'id',
    direction: 'desc'
  },
  //filter: [{by: 'study', value: '1'},{...}]
  filter: []
}

export const mutationTypes = {
  getDataSuccess: '[admin] Get data success',
  setApplicationStatus: '[admin] Application status sat',
  setSettlementStatus: '[admin] Settlement status sat',
  setSearchString: '[admin] Set search string mutation',
  softDeleteApplication: '[admin] Soft delete application mutation',
  restoreApplication: '[admin] Restore softly deleted application mutation',
  setApplicationSort: '[admin] Set application sort mutation',
  setFilter: '[admin] Append filter mutation'
}

export const actionTypes = {
  getData: '[admin] Get data',
  getFilteredApplications: '[admin] Get filtered applications action',
  setApplicationStatus: '[admin] Set application status',
  setSettlementStatus: '[admin] Set settlement status',
  setSearchString: '[admin] Set search string action',
  softDeleteApplication: '[admin] Soft delete application action',
  restoreApplication: '[admin] Restore softly deleted application action',
  setApplicationSort: '[admin] Set application sort action',
  appendFilter: '[admin] Append filter action',
  resetFilter: '[admin] Clear filter action'
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
      if (status == 0) application.settlement.status = 0
    })
  },
  [mutationTypes.setSettlementStatus](state, payload) {
    let applicationId = payload.applicationId
    let status = payload.status

    state.data.forEach(application => {
      if (application.id == applicationId)
        application.settlement.status = status
    })
  },
  [mutationTypes.setSearchString](state, payload) {
    let searchString = payload.searchString
    state.searchString = searchString
  },
  [mutationTypes.softDeleteApplication](state, payload) {
    let applicationId = payload.applicationId
    state.data.forEach(application => {
      if (application.id == applicationId) {
        application.deleted = true
        application.applicant.deleted = true
        application.settlement.deleted = true
      }
    })
  },
  [mutationTypes.restoreApplication](state, payload) {
    let applicationId = payload.applicationId
    state.data.forEach(application => {
      if (application.id == applicationId) {
        application.deleted = false
        application.applicant.deleted = false
        application.settlement.deleted = false
      }
    })
  },
  [mutationTypes.setApplicationSort](state, payload) {
    state.sortApplications.by = payload.by
    state.sortApplications.direction = payload.direction
  },
  [mutationTypes.setFilter](state, payload) {
    state.filter = payload.filter
  }
}

//вынести гетеры в отдельный тип и переменную
const actions = {
  [actionTypes.getData](context, {apiUrl}) {
    return new Promise(resolve => {
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
  },
  [actionTypes.setSearchString](context, {searchString}) {
    context.commit(mutationTypes.setSearchString, {searchString})
  },
  [actionTypes.softDeleteApplication](context, {applicationId}) {
    //context.commit(mutationTypes.softDeleteApplication, {applicationId})
    return new Promise(resolve => {
      adminApi.deleteApplication({type: 'soft', applicationId}).then(() => {
        context.commit(mutationTypes.softDeleteApplication, {
          applicationId,
          type: 'soft'
        })
        resolve(applicationId)
      })
    })
  },
  [actionTypes.restoreApplication](context, {applicationId}) {
    return new Promise(resolve => {
      adminApi.restoreApplication({type: 'soft', applicationId}).then(() => {
        context.commit(mutationTypes.restoreApplication, {
          applicationId,
          type: 'soft'
        })
        resolve(applicationId)
      })
    })
  },
  [actionTypes.setApplicationSort](context, {by, direction}) {
    context.commit(mutationTypes.setApplicationSort, {by, direction})
  },
  [actionTypes.appendFilter](context, {filter}) {
    let newFilter = []

    if (!context.state.filter) {
      newFilter = [...context.state.filter, filter]
    } else {
      let isNew = true

      newFilter = context.state.filter.map(item => {
        if (item.by === filter.by) {
          item.value = filter.value
          isNew = false
        }
        return item
      })

      if (isNew) newFilter = [...context.state.filter, filter]
    }

    context.commit(mutationTypes.setFilter, {
      filter: newFilter
    })
  },
  [actionTypes.resetFilter](context) {
    context.commit(mutationTypes.setFilter, {
      filter: []
    })
  },
  [actionTypes.getFilteredApplications](context, {input}) {
    //let output = context.state.data
    let output = input
    let filter = context.state.filter

    if (filter.length) {
      if (output.length) {
        output = output.filter(application => {
          let isPass = []

          state.admin.filter.map(item => {
            switch (item.by) {
              case 'payment_method':
                if (application.applicant.payment_method.id == item.value)
                  isPass.push(true)
                break
              case 'application_status':
                if (application.status == item.value) isPass.push(true)
                break
              case 'settlement_status':
                if (application.settlement.status == item.value)
                  isPass.push(true)
                break
              case 'study_place':
                if (application.applicant.study_place.id == item.value)
                  isPass.push(true)
                break
            }
          })

          return isPass.length == state.admin.filter.length
        })
      }
    }

    return output
  }
}

const getters = {
  getFilteredApplications: state => input => {
    let output = input
    let filter = state.filter

    if (filter.length) {
      if (output.length) {
        output = output.filter(application => {
          let isPass = []

          state.admin.filter.map(item => {
            switch (item.by) {
              case 'payment_method':
                if (application.applicant.payment_method.id == item.value)
                  isPass.push(true)
                break
              case 'application_status':
                if (application.status == item.value) isPass.push(true)
                break
              case 'settlement_status':
                if (application.settlement.status == item.value)
                  isPass.push(true)
                break
              case 'study_place':
                if (application.applicant.study_place.id == item.value)
                  isPass.push(true)
                break
            }
          })

          return isPass.length == state.admin.filter.length
        })
      }
    }

    return output
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
