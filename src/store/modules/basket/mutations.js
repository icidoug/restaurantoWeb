export default {
    setItems(state, items) {
        state.items = items
    },
    addItem(state, item) {
        state.items.push(item);
        console.log('state.items', state.items)
    },
    updateQuantity(state, context) {
        let index = state.items.findIndex(d => d.product_id === context.product_id);
    
        state.items[index].quantity = context.quantity
    },
    deleteItem(state, context) {
        console.log('DLETE', state.items)
        let index = state.items.findIndex(d => d.product_id === context.product_id);
    
        console.log('delete', state.items[index])
        //state.items[index].quantity = 0;
        state.items = state.items.filter(item => item?.product_id !== context.product_id) || []
        //delete state.items[index];
    }
}
