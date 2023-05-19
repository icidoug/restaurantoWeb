<template>
    <div class="catalog-items">
        <div class="catalog-items__title">
            {{ section.name }}
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
            section: {
                type: Object,
                required: true
            },
        },
        setup(props) {
            console.log('props.items', props.items)
            return {

            }
        }
    }
</script>

<style lang="scss">

</style>
