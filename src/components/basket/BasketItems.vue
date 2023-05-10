<template>
    <div class="basket-items">
        <basket-item v-for="i in 6" :item="{}"/>
        <div class="basket-items__footer">
            <div class="basket-items__footer_title">
                Сумма заказа:
            </div>
            <div class="basket-items__footer_price">
                2156₽
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import BasketItem from "@/components/basket/BasketItem.vue";

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
        setup(props) {

            return {

            }
        }
    }
</script>

<style lang="scss">

</style>
