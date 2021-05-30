import axios from 'axios'

const getApplicants = () => {
  return axios.get('applicants/')
}

const setStatus = ({type, applicationId, status}) => {
  return axios.patch('set_status/', {
    application_id: applicationId,
    status: status,
    type: type
  })
}

const deleteApplication = ({type, applicationId}) => {
  return axios.patch(`${applicationId}/delete/`, {
    application_id: applicationId,
    type: type
  })
}

const restoreApplication = ({type, applicationId}) => {
  return axios.patch(`${applicationId}/restore/`, {
    application_id: applicationId,
    type: type
  })
}

const getApplicationStatuses = () => {
  return [
    {
      id: 0,
      name_ru: 'На рассмотрении'
    },
    {
      id: 1,
      name_ru: 'Одобрено'
    },
    {
      id: 2,
      name_ru: 'Отказано'
    }
  ]
}

const getSettlementStatuses = () => {
  return [
    {
      id: 0,
      name_ru: 'Не вселён'
    },
    {
      id: 1,
      name_ru: 'Вселён'
    },
    {
      id: 2,
      name_ru: 'Выслен'
    }
  ]
}

export default {
  getApplicants,
  setStatus,
  deleteApplication,
  restoreApplication,
  getApplicationStatuses,
  getSettlementStatuses
}
