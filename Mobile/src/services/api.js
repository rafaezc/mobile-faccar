import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000' //--trocar para 127.0.0.1 melhorou o tempo de respota mas nao resolveu 192.168.203.128--//
});

export default api;