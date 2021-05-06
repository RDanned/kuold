import axios from 'axios'

const getApplicants = () => {
  return axios.get('applicants/')
}

export default {
  getApplicants
}