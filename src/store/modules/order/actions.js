import axios from 'axios'

export default {
	getOrder({commit, getters, rootGetters}) {
		let url = import.meta.env.VITE_API_URL + '/order/';
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				const items = response.data.data.list.map(item => {
					const catalogItem = rootGetters['catalog/getItemById'](item.id);
					return {...item, image: catalogItem?.image || '', is_checked: true};
				});
				
				console.log('getOrder', response.data)
				
				commit('setId', 123);
				commit('setItems', items || []);
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
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

