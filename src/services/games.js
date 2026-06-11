
import { apiHeaderConfiguration } from '../lib/utils/global';
import { EMPTY, MULTIPART, TOKEN } from '../lib/utils/constants'
import axiosInstance from './Interceptor';
import { BASE_URL } from '../enviroments';
import axios from 'axios';

const Api = {
    getConsoleServers: function (token) {
        return axiosInstance.get('game/console', apiHeaderConfiguration(token, TOKEN))
    },
    createConsoleServer: function (data, token) {
        return axiosInstance.post('game/console/create', data, apiHeaderConfiguration(token, TOKEN))
    },
    getGames: function (token) {
        return axiosInstance.get('game', apiHeaderConfiguration(token, TOKEN))
    },
    getLeaderBoard: function (id,token) {
        return axiosInstance.get(`game/get-leader-board/${id}`, apiHeaderConfiguration(token, TOKEN))
    },

};

export default Api;