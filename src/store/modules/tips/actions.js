import axios from 'axios'

export default {
	pay({commit, getters, rootGetters}, {type, sum, commission}) {
		let url = import.meta.env.VITE_API_URL + '/order/',
			action = 'tips';
		
		return axios.post(url, {
			action: action,
			type: type,
			sum: sum,
			waiter_id: rootGetters['waiter/waiter']?.id,
			order_id: rootGetters['order/id'],
			commission: commission,
		}, {withCredentials: true})
			.then(response => {
				//commit('setId', response.data.data.ORDER_ID);
				/*if (response.data.data.link) {
					const link = document.createElement('a');
					link.href = response.data.data.link;
					link.click();
				}
				
				return false;*/
				return response;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
}

