import axios from 'axios'

export default {
	getPartner({commit}) {
		let url = import.meta.env.VITE_API_URL + '/partner/';
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				commit('setPartner', response.data.data || []);
				return response.data.data;
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
}

