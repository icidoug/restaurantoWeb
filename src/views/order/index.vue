<template>
    <f7-page>
        <div class="order">
            <navbar title="Текущий заказ" back-url="/" share/>
            <order-items v-if="items.length > 0" :items="items"/>
            <div v-else class="basket__empty padding-side">
               В заказе нет товаров
            </div>
            <order-tips/>
            <order-form/>
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

    export default {
        components: {
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

            return {
                items
            };
        }
    }
</script>
