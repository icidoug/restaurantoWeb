import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    getSections({commit}) {
        let url = process.env.VUE_APP_API_URL + '/catalog/sections/';
        
        return axios.get(url)
            .then(response => {
                if(response.data.data.length > 0) {
                    commit('setSections', response.data.data)
                }
            })
            .catch(error => console.log('Ошибка: ', error))
        
    },
    getProducts({state, commit, getters}, isAppendTo) {
        let url = process.env.VUE_APP_API_URL + '/catalog/items/',
            params = {};

        if(getters.section) {
            url += getters.section + '/'
        }

        if(getters['currentPage'] > 1) {
            params.page = getters['currentPage'];
        }

        if(getters['sort'] || Cookies.get('sort')) {
            params.sort = getters['sort'] ? getters['sort'] : Cookies.get('sort');
        }

        if(Object.keys(getters['activeFilters']).length) {
            for(let filterName in getters['activeFilters']) {
                params[filterName] = getters['activeFilters'][filterName];
            }
        }

        return axios.get(url, {params: params})
            .then(response => {
                if(getters.isAppendTo || isAppendTo) {
                    commit('productsAppendTo', response.data.data.items)
                    commit('setIsAppendTo', false)
                }
                else {
                    commit('setProducts', response.data.data.items)
                }

                commit('setNavigation', response.data.data.navigation)
                commit('setFilters', response.data.data.filters)
            })
            .catch(error => console.log('Ошибка: ', error))

    },
}

