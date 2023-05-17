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
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	updateBasket({commit, getters, rootGetters}, {item, quantity}) {
		let url = import.meta.env.VITE_API_URL + '/basket/',
			action = 'add';
		
		const basketItem = getters['getItemById'](item.id);
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
				})
				break;
			case "remove":
				commit('deleteItem', {
					id: item.id,
					quantity: quantity,
				})
				break;
		}
		
		return axios.post(url, {
			action: action,
			id: item.id,
			quantity: quantity,
		}, {withCredentials: true})
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

