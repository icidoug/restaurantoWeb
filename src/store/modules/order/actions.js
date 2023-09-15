import axios from 'axios'
import Cookies from "js-cookie";

export default {
	getOrder({commit, getters, rootGetters}) {
		let url = import.meta.env.VITE_API_URL + '/order/';
		if(localStorage.lastOrderId) {
			url += '?id=' + localStorage.lastOrderId;
		}
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				commit('setSplitBill', false);
				const items = response.data.data?.list.map(item => {
					const catalogItem = rootGetters['catalog/getItemById'](item.id);
					if(item.is_paid) {
						commit('setSplitBill', true);
					}
					return {...item, image: catalogItem?.image || '', is_checked: !item.is_paid};
				});
				
				commit('setId', response.data.data?.id);
				commit('setIsPaid', response.data.data?.is_paid);
				localStorage.lastOrderId = response.data.data?.id || null;
				commit('setItems', items || []);
				commit('setPayments', response.data.data?.payments || {});
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
			table: Cookies.get('table')
		}, {withCredentials: true})
			.then(response => {
				commit('setId', response.data.data.ORDER_ID);
				localStorage.lastOrderId = response.data.data.ORDER_ID || null;
				return true;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
	pay({commit, getters, rootGetters}, {type, commission}) {
		let url = import.meta.env.VITE_API_URL + '/order/',
			action = 'pay';
		
		const params = {
			action: action,
			type: type,
			id: getters['id'],
			commission: commission,
		};
		
		if(getters['splitBill']) {
			const checkedItems = getters['checkedItems'];
			params.items = checkedItems.map(item => item.basket_id);
		}
		
		if(getters['tipsSum'] > 0) {
			params.tips = getters['tipsSum'];
			params.waiter_id = rootGetters['waiter/waiter']?.id;
		}
		
		return axios.post(url, params, {withCredentials: true})
			.then(response => {
				//commit('setId', response.data.data.ORDER_ID);
				if(response.data.data.link) {
					const link = document.createElement('a');
					link.href = response.data.data.link;
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

