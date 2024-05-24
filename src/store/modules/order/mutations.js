export default {
    setId(state, id) {
        state.id = id
    },
    setItems(state, items) {
        state.items = items
    },
    setSplitBill(state, splitBill) {
        const paidItems = state.items.filter(item => item.is_paid === true) || [];
        if(paidItems.length > 0 && !state.isPaid) {
            splitBill = true;
        }
        state.splitBill = splitBill
    },
    setCheckedItem(state, index) {
        //let index = state.items.findIndex(item => item.id === id);
    
        if (index > -1 && state.items[index]) {
            state.items[index].is_checked = !state.items[index].is_checked
        }
    },
    setCheckedItemByBasketId(state, basketId) {
        let index = state.items.findIndex(item => item.basket_id === basketId);
    
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
    setPayments(state, payments) {
        state.payments = payments
    },
    setIsOpenPayDalaModal(state, isOpenPayDalaModal) {
        state.isOpenPayDalaModal = isOpenPayDalaModal
    },
    setIsPaymentFetching(state, isPaymentFetching) {
        state.isPaymentFetching = isPaymentFetching
    },
}
