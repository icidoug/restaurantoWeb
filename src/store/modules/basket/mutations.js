export default {
	setItems(state, items) {
		state.items = items
	},
	setSuitableItems(state, suitableItems) {
		state.suitableItems = suitableItems
	},
	addItem(state, item) {
		state.items.push(item);
	},
	updateQuantity(state, context) {
		let index = state.items.findIndex(item => item.id === context.id && item?.extra_for_item === context?.extra_for_item);
		
		if (index > -1) {
			state.items[index].quantity = context.quantity
		}
	},
	deleteItem(state, basket_id) {
		let index = state.items.findIndex(item => item.basket_id === basket_id);
		
		//state.items[index].quantity = 0;
		state.items = state.items.filter(item => item?.basket_id !== basket_id) || []
	}
}
