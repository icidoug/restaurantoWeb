export default {
    setItems(state, items) {
        state.items = items
    },
    setIsOpenModal(state, isOpenModal) {
        state.isOpenModal = isOpenModal
    },
    setDetailItem(state, detailItem) {
        state.detailItem = detailItem
    },
    setIsDetailFetching(state, isDetailFetching) {
        state.isDetailFetching = isDetailFetching
    },
}
