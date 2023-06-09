import axios from 'axios'

export default {
	getWaiter({commit}, {table, zone}) {
		let url = import.meta.env.VITE_API_URL + `/seat/${table}/?zone=${zone}`;
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				commit('setWaiter', response.data.data || []);
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	call({commit, getters}, comment) {
		let url = import.meta.env.VITE_API_URL + '/call/';
		
		return axios.post(url, {
			action: 'call',
			comment: comment
		}, {withCredentials: true})
			.then(response => {
				return !!response.data.data.id;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
	callHookah({commit, getters}, comment) {
		let url = import.meta.env.VITE_API_URL + '/call/';
		
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

