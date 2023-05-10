import axios from 'axios'

export default {
	getItems({commit, getters}) {
		let url = import.meta.env.VITE_API_URL + '/basket/items/',
			params = {};
		
		if (getters.section) {
			params.section = getters.section;
		}
		
		return axios.get(url, {params: params, withCredentials: true})
			.then(response => {
				commit('setItems', response.data.data)
				commit('setSectionItems')
			})
			.catch(error => console.log('Ошибка: ', error))
		
	},
	updateBasket({commit, getters}, {id, quantity}) {
		let url = import.meta.env.VITE_API_URL + '/basket/',
			action = 'add';
		
		const basketItem = getters['getItemByProductId'](id);
		console.log('basketItem', basketItem)
		if (basketItem.id) {
			action = quantity > 0 ? 'update' : 'delete';
		}
		
		url += action + '/';
		
		console.log({id, quantity})
		console.log('url', url)
		
		switch (action) {
			case "add":
				commit('addItem', {
					id: 1,
					product_id: id,
					quantity: quantity,
				})
				break;
			case "update":
				commit('updateQuantity', {
					product_id: id,
					quantity: quantity,
				})
				break;
			case "delete":
				commit('deleteItem', {
					product_id: id,
					quantity: quantity,
				})
				break;
				
		}
		
		/*return axios.post(url, {
			id: id,
			quantity: quantity,
		}, {withCredentials: true})
			.then(response => {
				//commit('setItems', response.data.data)
				//commit('setSectionItems')
			})
			.catch(error => console.log('Ошибка: ', error))*/
	}
}

