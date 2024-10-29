export default {
    items: state => state.items,
    suitableItems: state => state.suitableItems,
    getItemById: (state) => (id) => state.items.find(item => item?.id === id) || {},
    sum: state => state.items.reduce((n, {price, quantity}) => n + price * quantity, 0)
}
