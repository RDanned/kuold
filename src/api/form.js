import axios from 'axios'

const getFormData = () => {
    return axios.get('form_data/')
}

const send = (data) => {
    return axios.post('send/', {
        ...data
    })
}

export default {
    getFormData,
    send
}