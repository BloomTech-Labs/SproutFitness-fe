import axios from 'axios';

export default function() {
    return axios.create({
        baseURL: "https://sprout-fitness-be-prod.herokuapp.com/",
        headers: {
            Authorization: localStorage.getItem('token'),
        },
    })
}