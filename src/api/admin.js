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

export default {
  getApplicants,
  setStatus,
  deleteApplication,
  restoreApplication
}
