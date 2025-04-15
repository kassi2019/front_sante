import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.backend.pro-sante.info/api'
   //baseURL:'http://127.0.0.1:8000/api'
    //baseURL: 'process.env.VUE_APP_GESTION_OP_URL'
    //baseURL: 'http://DESKTOP-7H09IIP:93/projet_sante/backend_app_sante/public/api'
    // baseURL: 'http://DESKTOP-7H09IIP:51/SID-CF/back-end'
})
