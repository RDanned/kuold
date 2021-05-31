import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'http://127.0.0.1:8000/applications'

//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use(config => {
  const token = getItem('token')
  const authorizisationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizisationToken
  return config
})

export default axios
