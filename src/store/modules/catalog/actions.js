import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    getSections({commit}) {
        let url = import.meta.env.VITE_API_URL + '/catalog/sections/';
        
        return axios.get(url, {withCredentials: true})
            .then(response => {
                if(response.data.data.length > 0) {
                    commit('setSections', response.data.data)
                    commit('setActiveSection', response.data.data[0])
                }
            })
            .catch(error => console.log('Ошибка: ', error))
        
    },
    getItems({state, commit, getters}) {
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
}

