export default {
    items: state => state.items,
    getItemByProductId: (state) => (product_id) => {
        return state.items.find(item => item?.product_id === product_id) || {}
    }
}
