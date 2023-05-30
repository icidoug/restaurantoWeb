import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    getItems({commit, getters}) {
        let url = import.meta.env.VITE_API_URL + '/news/',
            params = {};
        
        if(getters.section) {
            params.section = getters.section;
        }

        return axios.get(url, {params: params, withCredentials: true})
            .then(response => {
                commit('setItems', response.data.data?.items || []);
            })
            .catch(error => console.log('Ошибка: ', error))

    },
    getDetail({commit, getters}, id) {
        let url = import.meta.env.VITE_API_URL + `/news/detail/${id}/`;
    
        commit('setIsDetailFetching', true)
        return axios.get(url)
            .then(response => {
                let detailItem = response.data.data;
                commit('setDetailItem', detailItem);
                commit('setIsDetailFetching', false);
            })
            .catch(error => console.log('Ошибка: ', error))

    },
}

