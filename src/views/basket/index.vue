<template>
    <f7-page>
        <div class="basket">
            <navbar title="Текущий заказ" share/>
            <basket-items :items="[]"/>
            <div class="basket__subtitle padding-side">
                Рекомендуем заказать
            </div>
            <div class="padding-side">
                <catalog-buy-with :items="[
                                        {
                                            'id'           : 1,
                                            'name'         : 'Суп с цыпленком и шпинатом',
                                            'image'        : '/src/assets/images/emoji/catalog-card.png',
                                            'price'        : 499,
                                            'price_format' : '499₽',
                                            'is_new'       : true,
                                        },
                                        {
                                            'id'           : 1,
                                            'name'         : 'Суп с цыпленком и шпинатом',
                                            'image'        : '/src/assets/images/emoji/catalog-card.png',
                                            'price'        : 499,
                                            'price_format' : '499₽',
                                            'is_new'       : false,
                                        },
                                        {
                                            'id'           : 1,
                                            'name'         : 'Суп с цыпленком и шпинатом',
                                            'image'        : '/src/assets/images/emoji/catalog-card.png',
                                            'price'        : 499,
                                            'price_format' : '499₽',
                                            'is_new'       : false,
                                        },
                                        {
                                            'id'           : 1,
                                            'name'         : 'Суп с цыпленком и шпинатом',
                                            'image'        : '/src/assets/images/emoji/catalog-card.png',
                                            'price'        : 499,
                                            'price_format' : '499₽',
                                            'is_new'       : false,
                                        },
                                    ]"/>
            </div>
            <basket-form/>
        </div>
        <catalog-card-popup/>
    </f7-page>
</template>

<script>
    import YourWaiter from "@/components/waiter/YourWaiter.vue";
    import Catalog from "@/components/catalog/Catalog.vue";
    import WaiterPopup from "@/components/waiter/WaiterPopup.vue";
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
            WaiterPopup,
            YourWaiter,
            Catalog
        },
        setup() {
            onMounted(async () => {
                await store.dispatch('catalog/getSections');
                await store.dispatch('catalog/getItems');
            });

            const items = computed(() => {
                return store.getters['catalog/sectionItems']
            });

            const sections = computed(() => {
                return store.getters['catalog/sections']
            });

            const activeSection = computed(() => {
                return store.getters['catalog/activeSection']
            });

            console.log('store.getters', store.getters)

            return {
                items,
                sections,
                activeSection
            };
        }
    }
</script>
