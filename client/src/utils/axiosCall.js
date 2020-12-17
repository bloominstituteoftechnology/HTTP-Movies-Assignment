import axios from 'axios'

export const axiosCall = () => {

    return axios.create({
        baseURL: 'http://localhost:5000'
    })
}

