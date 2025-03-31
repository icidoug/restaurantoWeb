import axios from 'axios'

export default {
	getWaiter({commit, dispatch}, {table, zone}) {
		let url = import.meta.env.VITE_API_URL + `/seat/${table}/?zone=${zone}`;
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				//commit('setIsError', response.data.status === 'error');
				commit('setWaiter', response.data.data || []);
				if (!response.data?.data?.id) {
					setTimeout(() => {
						dispatch('getWaiter', {table, zone})
					}, 10000)
				}
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	getWaiterById({commit, dispatch}, id) {
		let url = import.meta.env.VITE_API_URL + `/waiter/${id}/`;
		
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

