<template>
   <div class="buy-with">
       <div class="buy-with__wrapper">
          <catalog-buy-with-item v-for="item in items" :item="item"/>
       </div>
   </div>
</template>

<script>
    import CatalogBuyWithItem from "@/components/catalog/CatalogBuyWithItem.vue";

    export default {
        components: {CatalogBuyWithItem},
        props: {
            items: {
                type: Array,
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
