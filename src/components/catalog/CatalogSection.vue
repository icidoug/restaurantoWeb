<template>
    <div class="catalog-section padding-side" :class="{fixed: fixed}">
        <div class="catalog-section__wrapper" id="sectionNav">
            <div class="catalog-section__item active">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M2.41667 9.16667C2.41667 5.43875 5.43875 2.41667 9.16667 2.41667C12.8946 2.41667 15.9167 5.43875 15.9167 9.16667C15.9167 12.8946 12.8946 15.9167 9.16667 15.9167C5.43875 15.9167 2.41667 12.8946 2.41667 9.16667ZM9.16667 0.916672C4.61032 0.916672 0.916672 4.61032 0.916672 9.16667C0.916672 13.723 4.61032 17.4167 9.16667 17.4167C11.1748 17.4167 13.0153 16.6992 14.446 15.5066L16.9697 18.0303C17.2626 18.3232 17.7374 18.3232 18.0303 18.0303C18.3232 17.7374 18.3232 17.2626 18.0303 16.9697L15.5066 14.446C16.6992 13.0153 17.4167 11.1748 17.4167 9.16667C17.4167 4.61032 13.723 0.916672 9.16667 0.916672Z"
                          fill="#111111"/>
                </svg>
            </div>
            <div v-for="section in sections"
                 class="catalog-section__item"
                 :class="{active: section.id === activeSection.id}"
                 @click="scrollToSection(section)"
                 :data-tab="'#section_' + section.id"
            >
                {{ section.name }}
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import {onMounted, ref, onUnmounted} from "vue";

    export default {
        components: {},
        props: {
            sections: {
                type: Array,
                required: true
            },
        },
        setup(props) {
            const fixed = ref(false);
            const activeSection = ref(props.sections[0]);
            let scrollByClick = false;

            const onScroll = (event) => {
                const scrollTop = event.target.scrollTop;
                const sectionNavOffsetTop = event.target.sectionNavOffsetTop;

                fixed.value = scrollTop > sectionNavOffsetTop;

                if(!scrollByClick) {
                    let active = props.sections[0];

                    for (let sectionDiv of event.target.sectionsDiv) {
                        const elemId = sectionDiv.id.split('_');
                        const sectionId = elemId[1];

                        if (scrollTop > sectionDiv.offsetTop - 100) {
                            active = props.sections.find(item => item.id === sectionId);
                        }
                    }

                    activeSection.value = active;
                }
            }

            onMounted(() => {
                const f7page = document.getElementById('home');
                const scrollableDiv = f7page.querySelector('.page-content');
                const sectionNavDiv = document.getElementById('sectionNav');

                const sectionsDiv = document.querySelectorAll('.catalog-items');

                scrollableDiv.addEventListener('scroll', onScroll);
                scrollableDiv.sectionNavOffsetTop = sectionNavDiv.offsetTop;
                scrollableDiv.sectionsDiv = sectionsDiv;
            });

            onUnmounted(() => {
                scrollableDiv.removeEventListener('scroll', onScroll)
            })

            const scrollToSection = (section) => {
                scrollByClick = true;
                activeSection.value = section;
                const sectionDiv = document.getElementById('section_' + section.id);
                sectionDiv.scrollIntoView({behavior: 'smooth', block: 'start'});
                setTimeout(() => scrollByClick = false, 500)
            }

            return {
                scrollToSection,
                fixed,
                activeSection
            }
        }
    }
</script>

<style lang="scss">

</style>
