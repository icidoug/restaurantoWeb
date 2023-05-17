export default {
    id: state => state.id,
    items: state => state.items,
    getItemById: (state) => (id) => state.items.find(item => item?.id === id) || {},
    sum: (state) => {
        let items = state.items;
        
        if(state.splitBill) {
            items = state.items.filter(item => item.is_checked === true);
        }
        return items.reduce((n, {price}) => n + price, 0)
    },
    splitBill: state => state.splitBill,
    tipsType: state => state.tipsType,
    tipsSum: state => state.tipsSum,
}
