<template>
    <div class="catalog-section padding-side" :class="{fixed: fixed || isSearchOpen}">
        <div class="catalog-section__wrapper" id="sectionNav">
            <catalog-search/>
            <div v-if="!isSearchOpen/* && items?.filter(item => item.section_id === section.id).length > 0*/"
                 v-for="section in sections"
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
    import {onMounted, ref, computed} from "vue";
    import CatalogSearch from "@/components/catalog/CatalogSearch.vue";
    //import $$ from 'Dom7'

    export default {
        components: {CatalogSearch},
        props: {
            sections: {
                type: Array,
                required: true
            },
            items: {
                type: Array,
                required: true
            },
        },
        setup(props) {
            const isSearchOpen = computed(() => {
                return store.getters['catalog/isSearchOpen']
            });

            const fixed = ref(false);
            const activeSection = ref(props.sections[0]);
            let scrollByClick = false;

            onMounted(() => {
                /*let home = $$('#home:not(.page-previous)');
                if(home.length > 1) {
                    home = home.eq(1);
                }
                const scrollableDiv = home.find('.page-content');
                const sectionNavDiv = home.find('.catalog-section');
                const sectionsDiv = home.find('.catalog-items');

                scrollableDiv.on('scroll', () => {
                    const scrollTop = scrollableDiv.scrollTop();
                    const navOffsetTop = sectionNavDiv[0].offsetTop;

                    fixed.value = scrollTop > navOffsetTop;

                    if (!scrollByClick) {
                        let active = props.sections[0];

                        for (let sectionDiv of sectionsDiv) {
                            const elemId = sectionDiv.id.split('_');
                            const sectionId = elemId[1];

                            if (scrollTop > sectionDiv.offsetTop - 100) {
                                active = props.sections.find(item => item.id === sectionId);
                            }
                        }

                        activeSection.value = active;
                    }
                });*/

                const f7page = document.querySelectorAll('#home:not(.page-previous)')[0];
                const scrollableDiv = f7page.querySelector('.page-content');
                const sectionNavDiv = document.getElementById('sectionNav');

                const sectionsDiv = document.querySelectorAll('.catalog-items');
                console.log('scrollableDiv', scrollableDiv)

                scrollableDiv.addEventListener('scroll', onScroll);
                scrollableDiv.sectionNavOffsetTop = sectionNavDiv.getBoundingClientRect().top;
                scrollableDiv.sectionsDiv = sectionsDiv;
            });

            const onScroll = (event) => {
                const scrollTop = event.target.scrollTop;
                const sectionNavOffsetTop = event.target.sectionNavOffsetTop;
                fixed.value = scrollTop > sectionNavOffsetTop;
                if (!scrollByClick) {
                    let active = props.sections[0];

                    for (let sectionDiv of event.target.sectionsDiv) {
                        const elemId = sectionDiv.id.split('_');
                        const sectionId = elemId[1];

                        if (scrollTop > sectionDiv.getBoundingClientRect().top + 800) {
                            active = props.sections.find(item => item.id === sectionId);
                        }
                    }

                    activeSection.value = active;
                }
            }

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
                activeSection,
                isSearchOpen
            }
        },
    }
</script>

<style lang="scss">

</style>
