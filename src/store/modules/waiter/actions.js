import axios from 'axios'

export default {
	getWaiter({commit}) {
		let url = import.meta.env.VITE_API_URL + '/waiter/';
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				commit('setWaiter', response.data.data || []);
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	call({commit, getters}, comment) {
		let url = import.meta.env.VITE_API_URL + '/waiter/';
		
		console.log('call')
		
		return axios.post(url, {
			action: 'call',
			comment: comment
		}, {withCredentials: true})
			.then(response => {
				return true;
			})
			.catch(error => console.log('Ошибка: ', error))
	}
}

