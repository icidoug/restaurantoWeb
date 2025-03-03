export default {
    items: state => state.items,
    suitableItems: state => state.suitableItems,
    getItemById: (state) => (id) => state.items.find(item => item?.id === id) || {},
    getItemQuantityById: (state) => (id) => state.items.filter(item => item?.id === id).length || 0,
    getLastItemById: (state) => (id) => [...state.items].reverse().find(item => item.id === id) || null,
    getExtraItemById: (state) => (id, extra_for_item) => state.items.find(item => item?.id === id && item?.extra_for_item === extra_for_item) || {},
    sum: state => state.items.reduce((n, {price, quantity}) => n + price * quantity, 0)
}
