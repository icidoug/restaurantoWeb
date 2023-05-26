<template>
    <div
        class="catalog"
        :class="{'catalog--search': isSearchOpen}"
    >
        <catalog-section v-if="sections.length > 0 && activeSection" :sections="sections" :items="items"/>
        <div class="catalog__wrapper">
            <catalog-items v-if="items.length > 0 && sections.length > 0"
                           v-for="section in sections"
                           :id="'section_' + section.id"
                           :items="items.filter(item => item.section_id === section.id)"
                           :section="section"
            />
        </div>
    </div>
</template>

<script>
    import CatalogSection from "@/components/catalog/CatalogSection.vue";
    import CatalogItems from "@/components/catalog/CatalogItems.vue";
    import {computed} from "vue";
    import store from "@/store/store";

    export default {
        components: {
            CatalogSection,
            CatalogItems
        },
        props: {
            items: {
                type: Array,
                required: true
            },
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
            const isSearchOpen = computed(() => {
                return store.getters['catalog/isSearchOpen']
            });

            return {
                isSearchOpen
            }
        }
    }
</script>

<style lang="scss">

</style>
