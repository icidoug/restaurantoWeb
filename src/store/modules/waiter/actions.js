import axios from 'axios'

export default {
	getWaiter({commit}, seat) {
		let url = import.meta.env.VITE_API_URL + `/seat/${seat}/`;
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				commit('setWaiter', response.data.data || []);
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	call({commit, getters}, comment) {
		let url = import.meta.env.VITE_API_URL + '/waiter/';
		
		return axios.post(url, {
			action: 'call',
			comment: comment
		}, {withCredentials: true})
			.then(response => {
				return !!response.data.data.success;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
	callHookah({commit, getters}, comment) {
		let url = import.meta.env.VITE_API_URL + '/waiter/';
		
		return axios.post(url, {
			action: 'hookah',
			comment: comment
		}, {withCredentials: true})
			.then(response => {
				return !!response.data.data.success;
			})
			.catch(error => console.log('Ошибка: ', error))
	}
}

