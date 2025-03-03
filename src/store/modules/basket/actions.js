import axios from 'axios'

export default {
	getItems({commit, getters, rootGetters}) {
		let url = import.meta.env.VITE_API_URL + '/basket/';
		
		return axios.get(url, {withCredentials: true})
			.then(response => {
				const items = response.data.data.list.map(item => {
					const catalogItem = rootGetters['catalog/getItemById'](item.id);
					return {...item, image: catalogItem?.image || ''};
				});
				
				commit('setItems', items || []);
				if(response.data.data.suitable_items.length > 0) {
					commit('setSuitableItems', response.data.data.suitable_items || []);
				}
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	updateBasket({commit, getters, rootGetters}, {item, quantity, extra_for_item}) {
		let url = import.meta.env.VITE_API_URL + '/basket/',
			action = 'add';
		
		const data = {
			action: action,
			id: item.id,
			quantity: quantity,
		};
		
		if(item.selected_extras) {
			data.selected_extras = item.selected_extras;
		}
		
		if (extra_for_item && (action === 'add' || action === 'edit')) {
			data.extra_for_item = extra_for_item;
		}
		
		return axios.post(url, data, {withCredentials: true})
			.then(response => {
				/*const items = response.data.data.list.map(item => {
					const catalogItem = rootGetters['catalog/getItemById'](item.id);
					return { ...item, image: catalogItem?.image || '' };
				});
				
				commit('setItems', items || []);*/
				commit('addItem', {
					id: item.id,
					basket_id: response.data.data.basket_id,
					name: item.name,
					image: item.image,
					price: item.price,
					price_format: item.price_format,
					quantity: quantity,
					selected_extras: item.selected_extras,
				})
			})
			.catch(error => console.log('Ошибка: ', error))
	},
	remove({commit, getters, rootGetters}, basket_id) {
		let url = import.meta.env.VITE_API_URL + '/basket/',
			action = 'remove';
		
		const data = {
			action: action,
			basket_id
		};
		
		return axios.post(url, data, {withCredentials: true})
			.then(response => {
				commit('deleteItem', basket_id)
			})
			.catch(error => console.log('Ошибка: ', error))
	},
}

