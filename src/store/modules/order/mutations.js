export default {
    setId(state, id) {
        state.id = id
    },
    setItems(state, items) {
        state.items = items
    },
    setSplitBill(state, splitBill) {
        state.splitBill = splitBill
    },
    setCheckedItem(state, index) {
        //let index = state.items.findIndex(item => item.id === id);
    
        if (index > -1 && state.items[index]) {
            state.items[index].is_checked = !state.items[index].is_checked
        }
    },
    setTipsType(state, tipsType) {
        state.tipsType = tipsType
    },
    setTipsSum(state, tipsSum) {
        state.tipsSum = tipsSum
    },
    setIsPaid(state, isPaid) {
        state.isPaid = isPaid
    },
}
