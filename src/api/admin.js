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

export default {
  getApplicants,
  setStatus
}
