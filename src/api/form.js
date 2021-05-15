import axios from 'axios'

const getFormData = () => {
    return axios.get('form_data/')
}

const send = (data) => {
    return axios.post('send/', {
        last_name: data.last_name,
        first_name: data.first_name,
        middle_name: data.middle_name,

        study_place: data.study_place,
        payment_method: data.payment_method,
        social_status: data.social_status,

        

    })
}

export default {
    getFormData,
    send
}