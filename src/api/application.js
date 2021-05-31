import axios from 'axios'

const getApplication = id => {
  return axios.get(`${id}/`).then(response => response.data)
}

export default {
  getApplication
}
