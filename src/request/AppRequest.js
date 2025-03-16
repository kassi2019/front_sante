import axios from 'axios';

export default axios.create({
baseURL: 'http://127.0.0.1:8000/api'
    //baseURL: process.env.VUE_APP_GESTION_OP_URL
    // baseURL: 'http://DESKTOP-7H09IIP:51/gestion_projet/gestion_projet_back_end/api',
    // baseURL: 'http://DESKTOP-7H09IIP:51/SID-CF/back-end'
})
