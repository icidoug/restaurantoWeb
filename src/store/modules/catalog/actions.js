import axios from 'axios'
import Cookies from 'js-cookie'

export default {
    getSections({commit}) {
        let url = import.meta.env.VITE_API_URL + '/catalog/section/';
        
        return axios.get(url, {withCredentials: true})
            .then(response => {
                if(response.data.data.length > 0) {
                    commit('setSections', response.data.data);
                    commit('setActiveSection', response.data.data[0]);
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
                commit('setItems', response.data.data);
                commit('setAllItems', response.data.data);
                commit('setSectionItems');
            })
            .catch(error => console.log('Ошибка: ', error))

    },
    getDetail({commit, getters}, id) {
        let url = import.meta.env.VITE_API_URL + `/catalog/detail/${id}/`;
    
        commit('setIsDetailFetching', true)
        return axios.get(url)
            .then(response => {
                let detailItem = response.data.data;
                return axios.get(url + 'reviews/')
                    .then(response => {
                        detailItem.reviews = response.data.data?.items || []
                        commit('setDetailItem', detailItem);
                        commit('setIsDetailFetching', false);
                    })
                    .catch(error => console.log('Ошибка: ', error))
            })
            .catch(error => console.log('Ошибка: ', error))

    },
    sendReview({commit, getters}, {id, review, ratingCode}) {
        let url = import.meta.env.VITE_API_URL + `/catalog/detail/${id}/reviews/`;
    
        return axios.post(url, {
            rating_code: ratingCode,
            text: review,
        }, {withCredentials: true})
            .then(response => {
                const detailItem = getters['detailItem'];
                detailItem.reviews = response.data.data?.items || [];
                commit('setDetailItem', detailItem);
            })
            .catch(error => console.log('Ошибка: ', error))

    },
}

