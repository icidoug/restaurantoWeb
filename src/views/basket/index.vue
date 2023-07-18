<template>
    <f7-page>
        <div class="basket">
            <navbar title="Текущий заказ" share/>
            <basket-items v-if="items.length > 0" :items="items"/>
            <div v-else class="basket__empty padding-side">
               В корзине пока нет товаров
            </div>
            <div class="basket__subtitle padding-side">
                Рекомендуем заказать
            </div>
            <div class="padding-side">
                <catalog-buy-with v-if="suitableItems && suitableItems.length > 0" :items="suitableItems"/>
            </div>
            <basket-form v-if="items.length > 0"/>
        </div>
        <catalog-card-popup v-if="items.length > 0"/>
    </f7-page>
</template>

<script>
    import Catalog from "@/components/catalog/Catalog.vue";
    import {onMounted, computed} from 'vue';
    import store from '@/store/store'
    import CatalogCardPopup from "@/components/catalog/CatalogCardPopup.vue";
    import Navbar from "@/components/Navbar.vue";
    import BasketItems from "@/components/basket/BasketItems.vue";
    import CatalogBuyWith from "@/components/catalog/CatalogBuyWith.vue";
    import BasketForm from "@/components/basket/BasketForm.vue";

    export default {
        components: {
            BasketForm,
            CatalogBuyWith,
            BasketItems,
            Navbar,
            CatalogCardPopup,
            Catalog
        },
        props: {
            f7router: Object,
        },
        setup(props) {
            //console.log('props', props.f7router)
            const orderId = computed(() => {
                return store.getters['order/Id']
            });



            onMounted(async () => {
                await store.dispatch('basket/getItems');
            });

            const items = computed(() => {
                return store.getters['basket/items']
            });

            const suitableItems = computed(() => {
                return store.getters['basket/suitableItems']
            });

            return {
                items,
                suitableItems
            };
        },
        mounted() {
            console.log('this.$f7', this.f7router)
        }
    }
</script>
