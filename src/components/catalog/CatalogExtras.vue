<template>
   <div class="buy-with">
       <div class="buy-with__wrapper">
          <catalog-extras-item v-for="extraItem in item.extras" :parent-item="item" :item="extraItem"/>
       </div>
   </div>
</template>

<script>
    import CatalogExtrasItem from "@/components/catalog/CatalogExtrasItem.vue";

    export default {
        components: {CatalogExtrasItem},
        props: {
            item: {
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
