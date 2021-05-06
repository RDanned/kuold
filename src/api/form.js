import axios from 'axios'

const getFormData = () => {
    return axios.get('form_data/')
}

export default {
    getFormData
}