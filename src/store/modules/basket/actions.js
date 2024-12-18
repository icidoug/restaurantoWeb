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
		
		
		const basketItem = extra_for_item ? getters['getExtraItemById'](item.id, extra_for_item) : getters['getItemById'](item.id);
		if (basketItem.id) {
			action = quantity > 0 ? 'edit' : 'remove';
		}
		
		switch (action) {
			case "add":
				commit('addItem', {
					id: item.id,
					name: item.name,
					image: item.image,
					price: item.price,
					price_format: item.price_format,
					quantity: quantity,
				})
				break;
			case "edit":
				commit('updateQuantity', {
					id: item.id,
					quantity: quantity,
					extra_for_item: extra_for_item,
				})
				break;
			case "remove":
				commit('deleteItem', {
					id: item.id,
					quantity: quantity,
				})
				break;
		}
		
		const data = {
			action: action,
			id: item.id,
			quantity: quantity,
		};
		
		if (extra_for_item && (action === 'add' || action === 'edit')) {
			data.extra_for_item = extra_for_item;
		}
		
		console.log('data', data)
		
		return axios.post(url, data, {withCredentials: true})
			.then(response => {
				/*const items = response.data.data.list.map(item => {
					const catalogItem = rootGetters['catalog/getItemById'](item.id);
					return { ...item, image: catalogItem?.image || '' };
				});
				
				commit('setItems', items || []);*/
			})
			.catch(error => console.log('Ошибка: ', error))
	},
}

