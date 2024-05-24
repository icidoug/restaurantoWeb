import axios from 'axios'
import Cookies from "js-cookie";

export default {
	getOrder({commit, getters, rootGetters}) {
		let url = import.meta.env.VITE_API_URL + '/order/';
		if(Cookies.get('table') && Cookies.get('zone') && Cookies.get('partner')) {
			url += '?table=' + Cookies.get('table') + '&zone=' + Cookies.get('zone') + '&partner=' + Cookies.get('partner');
		}
		return axios.get(url, {withCredentials: true})
			.then(response => {
				if(response.data?.data) {
					const urlParams = new URLSearchParams(window.location.search);
					const checkedItems = urlParams.has('items') ? urlParams.get('items').split(',') : [];
					commit('setSplitBill', false);
					if(response.data?.data?.list) {
						const items = response.data?.data?.list.map(item => {
							const catalogItem = rootGetters['catalog/getItemById'](item.id);
							if(item.is_paid || checkedItems.includes(item.basket_id)) {
								commit('setSplitBill', true);
							}
							
							let isChecked = false;
							if (checkedItems.length) {
								isChecked = checkedItems.includes(item.basket_id);
							} else {
								isChecked = !item.is_paid;
							}
							return {...item, image: catalogItem?.image || '', is_checked: isChecked};
						});
						
						commit('setItems', items || []);
					}
					
					commit('setId', response.data.data?.id);
					commit('setIsPaid', response.data.data?.is_paid);
					localStorage.lastOrderId = response.data.data?.id || null;
					commit('setPayments', response.data.data?.payments || {});
					
					return response.data?.data;
				}
				
				return {};
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
		
		console.log('pay', params)
		
		return axios.post(url, params, {withCredentials: true})
			.then(response => {
				//console.log('response', response)
				//commit('setId', response.data.data.ORDER_ID);
				
				return response;
			})
			.catch(error => console.log('Ошибка: ', error))
	},
	checkOrderPayment({commit, getters, rootGetters}, orderId) {
		let url = import.meta.env.VITE_API_URL + '/order/',
			action = 'check';
		
		const params = {
			action: action,
			id: orderId,
		};
		
		return axios.post(url, params, {withCredentials: true})
			.then(response => {
				commit('setIsPaid', response.data.data?.is_paid);
				return response.data?.data;
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
}

