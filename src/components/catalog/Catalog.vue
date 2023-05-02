<template>
    <div
        class="catalog"
    >
        <catalog-section v-if="sections.length > 0 && activeSection" :sections="sections" :active-section="activeSection"/>
        <catalog-items v-if="items.length > 0 && activeSection" :items="items" :active-section="activeSection"/>
    </div>
</template>

<script>
    import CatalogSection from "@/components/catalog/CatalogSection.vue";
    import CatalogItems from "@/components/catalog/CatalogItems.vue";

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
            console.log('items', props.items)
            return {}
        }
    }
</script>

<style lang="scss">

</style>
