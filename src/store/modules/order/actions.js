import axios from 'axios'

export default {
	getOrder({commit, getters, rootGetters}) {
		let url = import.meta.env.VITE_API_URL + '/order/';
		console.log('localStorage', localStorage)
		if(localStorage.lastOrderId) {
			url += '?id=' + localStorage.lastOrderId;
		}
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				const items = response.data.data?.list.map(item => {
					const catalogItem = rootGetters['catalog/getItemById'](item.id);
					return {...item, image: catalogItem?.image || '', is_checked: true};
				});
				
				console.log('getOrder', response.data)
				
				commit('setId', response.data.data?.id);
				commit('setIsPaid', response.data.data?.is_paid);
				localStorage.lastOrderId = response.data.data?.id || null;
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
	},
	pay({commit, getters, rootGetters}, {type}) {
		let url = import.meta.env.VITE_API_URL + '/order/',
			action = 'pay';
		
		return axios.post(url, {
			action: action,
			type: type,
			id: getters['id'],
		}, {withCredentials: true})
			.then(response => {
				console.log('response.data.data', response.data.data.link)
				//commit('setId', response.data.data.ORDER_ID);
				if(response.data.data.link) {
					const link = document.createElement('a');
					link.href = response.data.data.link;
					console.log('link', link)
					link.click();
				}
				
				return false;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
	checkOrderPayment({commit, getters, rootGetters}, {orderId}) {
		let url = import.meta.env.VITE_API_URL + '/order/?id=' + orderId;
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
			
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
}

