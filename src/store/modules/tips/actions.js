import axios from 'axios'

export default {
	create({commit, getters, rootGetters}, {type, comment}) {
		let url = import.meta.env.VITE_API_URL + '/order/',
			action = 'save';
		
		return axios.post(url, {
			action: action,
			type: type,
			comment: comment,
		}, {withCredentials: true})
			.then(response => {
				commit('setId', response.data.data.ORDER_ID);
				return true;
			})
			.catch(error => console.log('Ошибка: ', error))
	}
}

