import axios from 'axios'

export default {
	getPartner({commit}) {
		let url = import.meta.env.VITE_API_URL + '/partner/';
		console.log('getPartner')
		return axios.get(url, {withCredentials: true})
			.then(response => {
				console.log('response.data.data', response.data.data)
				commit('setPartner', response.data.data || []);
				return response.data.data;
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
}

