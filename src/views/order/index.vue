<template>
    <f7-page>
        <div class="order">
            <navbar :title="$t('current_order')" back-url="/" share/>
            <order-items v-if="items.length > 0" :items="items"/>
            <div v-else class="basket__empty padding-side">
                {{ $t('no_goods_in_order') }}
            </div>
            <order-tips v-if="waiter.id"/>
            <order-form/>
            <share-bill-popup />
        </div>
    </f7-page>
</template>

<script>
    import {onMounted, computed} from 'vue';
    import store from '@/store/store'
    import Navbar from "@/components/Navbar.vue";
    import OrderItems from "@/components/order/OrderItems.vue";
    import OrderTips from "@/components/order/OrderTips.vue";
    import OrderForm from "@/components/order/OrderForm.vue";
    import ShareBillPopup from "@/components/ShareBillPopup.vue";

    export default {
        components: {
            ShareBillPopup,
            OrderForm,
            OrderTips,
            OrderItems,
            Navbar,
        },
        setup() {
            onMounted(async () => {
                await store.dispatch('order/getOrder');
            });

            const items = computed(() => {
                return store.getters['order/items']
            });
            const waiter = computed(() => {
                return store.getters['waiter/waiter']
            });

            return {
                items,
                waiter
            };
        }
    }
</script>
