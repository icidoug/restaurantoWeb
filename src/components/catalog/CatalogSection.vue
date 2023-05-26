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
    import {onMounted, ref, onUnmounted, computed, watch} from "vue";
    import CatalogSearch from "@/components/catalog/CatalogSearch.vue";

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

            console.log('oks')
            console.log(fixed)

            const onScroll = (event) => {
                //console.log('oks')
                const scrollTop = event.target.scrollTop;
                const sectionNavOffsetTop = event.target.sectionNavOffsetTop;
                //console.log('scrollTop', scrollTop)
                fixed.value = scrollTop > sectionNavOffsetTop;
                //console.log('scrollTop', scrollTop)
                //console.log('sectionNavOffsetTop', sectionNavOffsetTop)
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
                //console.log('fixed.value', fixed.value)
            }

            watch(() => fixed.value, (newfixed) => {
                console.log('newfixed', newfixed)
            });

            onMounted(() => {
                console.log('onMounted')
                const f7page = document.getElementById('home');
                const scrollableDiv = f7page.querySelector('.page-content');
                const sectionNavDiv = document.getElementById('sectionNav');

                const sectionsDiv = document.querySelectorAll('.catalog-items');
                console.log('scrollableDiv', scrollableDiv)

                scrollableDiv.removeEventListener('scroll', onScroll)
                scrollableDiv.addEventListener('scroll', onScroll);
                scrollableDiv.sectionNavOffsetTop = sectionNavDiv.getBoundingClientRect().top;
                scrollableDiv.sectionsDiv = sectionsDiv;
            });

            onUnmounted(() => {
                /*const f7page = document.getElementById('home');
                const scrollableDiv = f7page.querySelector('.page-content');
                const sectionNavDiv = document.getElementById('sectionNav');

                scrollableDiv.removeEventListener('scroll', onScroll)
                scrollableDiv.addEventListener('scroll', onScroll);
                scrollableDiv.sectionNavOffsetTop = sectionNavDiv.getBoundingClientRect().top;
                scrollableDiv.sectionsDiv = document.querySelectorAll('.catalog-items');
                fixed.value = true;
                console.log(fixed.value)*/
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
                activeSection,
                isSearchOpen
            }
        },
    }
</script>

<style lang="scss">

</style>
