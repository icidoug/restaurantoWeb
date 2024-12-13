export default {
    items: state => state.items,
    suitableItems: state => state.suitableItems,
    getItemById: (state) => (id) => state.items.find(item => item?.id === id) || {},
    getExtraItemById: (state) => (id, extra_for_item) => state.items.find(item => item?.id === id && item?.extra_for_item === extra_for_item) || {},
    sum: state => state.items.reduce((n, {price, quantity}) => n + price * quantity, 0)
}
