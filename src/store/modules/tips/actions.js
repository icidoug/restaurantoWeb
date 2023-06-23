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
				console.log('response.data.data', response.data.data.link)
				//commit('setId', response.data.data.ORDER_ID);
				if (response.data.data.link) {
					const link = document.createElement('a');
					link.href = response.data.data.link;
					console.log('link', link)
					link.click();
				}
				
				return false;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
}

