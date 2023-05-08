import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    getSections({commit}) {
        let url = import.meta.env.VITE_API_URL + '/catalog/section/';
        
        return axios.get(url, {withCredentials: true})
            .then(response => {
                if(response.data.data.length > 0) {
                    commit('setSections', response.data.data)
                    commit('setActiveSection', response.data.data[0])
                }
            })
            .catch(error => console.log('Ошибка: ', error))
        
    },
    getItems({commit, getters}) {
        let url = import.meta.env.VITE_API_URL + '/catalog/items/',
            params = {};
        
        if(getters.section) {
            params.section = getters.section;
        }

        return axios.get(url, {params: params, withCredentials: true})
            .then(response => {
                commit('setItems', response.data.data)
                commit('setSectionItems')
            })
            .catch(error => console.log('Ошибка: ', error))

    },
    getDetail({commit, getters}, id) {
        let url = import.meta.env.VITE_API_URL + `/catalog/detail/${id}/`;
    
        commit('setIsDetailFetching', true)
        return axios.get(url)
            .then(response => {
                commit('setDetailItem', response.data.data)
                commit('setIsDetailFetching', false)
            })
            .catch(error => console.log('Ошибка: ', error))

    },
}

