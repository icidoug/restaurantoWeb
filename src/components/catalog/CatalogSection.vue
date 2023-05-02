<template>
    <div class="catalog-section padding-side">
        <div class="catalog-section__item active">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.41667 9.16667C2.41667 5.43875 5.43875 2.41667 9.16667 2.41667C12.8946 2.41667 15.9167 5.43875 15.9167 9.16667C15.9167 12.8946 12.8946 15.9167 9.16667 15.9167C5.43875 15.9167 2.41667 12.8946 2.41667 9.16667ZM9.16667 0.916672C4.61032 0.916672 0.916672 4.61032 0.916672 9.16667C0.916672 13.723 4.61032 17.4167 9.16667 17.4167C11.1748 17.4167 13.0153 16.6992 14.446 15.5066L16.9697 18.0303C17.2626 18.3232 17.7374 18.3232 18.0303 18.0303C18.3232 17.7374 18.3232 17.2626 18.0303 16.9697L15.5066 14.446C16.6992 13.0153 17.4167 11.1748 17.4167 9.16667C17.4167 4.61032 13.723 0.916672 9.16667 0.916672Z" fill="#111111"/>
            </svg>
        </div>
        <div v-for="section in sections"
             class="catalog-section__item"
             :class="{active: section.id === activeSection.id}"
             @click="setActiveSection(section)"
        >
            {{ section.name }}
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'

    export default {
        components: {

        },
        props: {
            sections: {
                type: Array,
                required: true
            },
            activeSection: {
                type: Object,
                required: true
            },
        },
        setup(props) {
            console.log('activeSection', props.activeSection)
            const setActiveSection = (section) => {
                store.commit('catalog/setActiveSection', section);
                store.commit('catalog/setSectionItems');
            }
            return {
                setActiveSection
            }
        }
    }
</script>

<style lang="scss">

</style>
