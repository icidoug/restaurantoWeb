<template>
    <div class="basket-items">
        <div v-for="item in items">
            <basket-item v-for="i in item.quantity" :item="item"/>
        </div>
        <div class="basket-items__footer">
            <div class="basket-items__footer_title">
                {{ $t('order_price') }}:
            </div>
            <div class="basket-items__footer_price">
                {{ sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ $t('currency') }}
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import BasketItem from "@/components/basket/BasketItem.vue";
    import {computed} from 'vue';

    export default {
        components: {
            BasketItem

        },
        props: {
            items: {
                type: Array,
                required: true
            },
        },
        setup() {
            const sum = computed(() => {
                return store.getters['basket/sum']
            });

            return {
                sum
            }
        }
    }
</script>

<style lang="scss">

</style>
