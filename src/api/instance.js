import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5555',
    withCredentials: true
});



export default instance;