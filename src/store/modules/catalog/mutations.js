export default {
    setItems(state, items) {
        state.items = items
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
}
