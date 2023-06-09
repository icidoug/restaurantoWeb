export default {
    setItems(state, items) {
        state.items = items
    },
    setAllItems(state, allItems) {
        state.allItems = allItems
    },
    setSections(state, sections) {
        state.sections = sections
    },
    setSectionItems(state) {
        if(state.activeSection) {
            state.sectionItems = state.items.filter(item => item.section_id === state.activeSection.id);
        }
    },
    setActiveSection(state, activeSection) {
        state.activeSection = activeSection
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
    setIsSearchOpen(state, isSearchOpen) {
        state.isSearchOpen = isSearchOpen
    },
}
