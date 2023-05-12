<template>
    <div class="catalog-items">
        <div class="catalog-items__title">
            {{ activeSection.name }}
        </div>
        <div class="catalog-items__wrapper">
            <catalog-items-card v-for="item in items" :item="item"/>
        </div>
    </div>
</template>

<script>
    import CatalogItemsCard from "@/components/catalog/CatalogItemsCard.vue";

    export default {
        components: {
            CatalogItemsCard
        },
        props: {
            items: {
                type: Array,
                required: true
            },
            activeSection: {
                type: Object,
                required: true
            },
        },
        setup() {
            return {

            }
        }
    }
</script>

<style lang="scss">

</style>
