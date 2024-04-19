export default {
    id: state => state.id,
    isPaid: state => state.isPaid,
    items: state => state.items,
    getItemById: (state) => (id) => state.items.find(item => item?.id === id) || {},
    sum: (state) => {
        let items = state.items;
        
        if(state.splitBill) {
            items = state.items.filter(item => item.is_checked === true);
        }
        
        let sum = items.reduce((n, {price}) => n + price, 0);
        if(state.tipsSum > 0) {
            sum += state.tipsSum;
        }
        
        return sum;
    },
    sumWithoutTips: (state) => {
        let items = state.items;
        
        if(state.splitBill) {
            items = state.items.filter(item => item.is_checked === true);
        }
        
        return items.reduce((n, {price}) => n + price, 0);
    },
    fullSum: (state) => {
        let items = state.items;

        return items.reduce((n, {price}) => n + price, 0)
    },
    splitBill: state => state.splitBill,
    tipsType: state => state.tipsType,
    tipsSum: state => state.tipsSum,
    checkedItems: (state) => state.items.filter(item => item?.is_checked === true) || [],
    paidItems: (state) => state.items.filter(item => item?.is_paid === true) || [],
    payments: (state) => state.payments,
}
