export default {
    items: state => state.items,
    sections: state => state.sections,
    sectionItems: state => state.sectionItems,
    activeSection: state => state.activeSection,
    isOpenModal: state => state.isOpenModal,
    detailItem: state => state.detailItem,
    isDetailFetching: state => state.isDetailFetching,
    getItemById: (state) => (id) => state.items?.find(item => item?.id === id) || {}
}
