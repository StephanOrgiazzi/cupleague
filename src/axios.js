import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://altencup-dev.firebaseio.com/'
});

export default instance;