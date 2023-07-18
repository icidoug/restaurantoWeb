export default {
    setItems(state, items) {
        state.items = items
    },
    setSuitableItems(state, suitableItems) {
        state.suitableItems = suitableItems
    },
    addItem(state, item) {
        state.items.push(item);
        console.log('state.items', state.items)
    },
    updateQuantity(state, context) {
        let index = state.items.findIndex(item => item.id === context.id);
    
        if (index > -1) {
            state.items[index].quantity = context.quantity
        }
    },
    deleteItem(state, context) {
        console.log('DLETE', state.items)
        let index = state.items.findIndex(item => item.id === context.id);
    
        console.log('delete', state.items[index])
        //state.items[index].quantity = 0;
        state.items = state.items.filter(item => item?.id !== context.id) || []
        //delete state.items[index];
    }
}
