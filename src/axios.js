import axios from 'axios';

const instance = axios.create({
    baseURL: "https://us-central1-fir-bcd8c.cloudfunctions.net/api"
    // baseURL: "http://localhost:5001/fir-bcd8c/us-central1/api"  
    //THE API (cloud function) URL
})

export default instance;