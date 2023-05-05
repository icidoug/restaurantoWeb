<template>
   <div class="buy-with">
       <div class="buy-with__wrapper">
          <catalog-buy-with-item v-for="i in 5"/>
       </div>
   </div>
</template>

<script>
    import {ref, computed} from 'vue'
    import store from '@/store/store'
    import CatalogBuyWithItem from "@/components/catalog/CatalogBuyWithItem.vue";

    export default {
        components: {CatalogBuyWithItem},
        setup() {

            return {

            }
        }
    }
</script>

<style lang="scss">

</style>
