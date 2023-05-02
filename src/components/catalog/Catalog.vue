<template>
    <div
        class="catalog"
    >
        <catalog-section/>
        <catalog-items/>
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
        setup() {

            return {}
        }
    }
</script>

<style lang="scss">

</style>
