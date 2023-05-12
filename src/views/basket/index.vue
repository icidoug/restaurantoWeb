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
                <catalog-buy-with :items="[
                                        {
                                            id: '6',
                                            image: 'https://restauranto.8up.ru/upload/resize_cache/iblock/620/500_500_2/flz6apk1i5ut7pclkzbcu096eseg1gsq.png',
                                            is_hit: true,
                                            is_new: false,
                                            name: 'Салат Крендель',
                                            price: 589,
                                            price_format: '589 ₽',
                                        },
                                        {
                                            id: '1',
                                            image: 'https://restauranto.8up.ru/upload/iblock/00a/33a1ti3sbmgnztdc8th4fujdfwk61f52.png',
                                            is_hit: false,
                                            is_new: false,
                                            name: 'Омлет с тигровыми креветками и моцареллой',
                                            price: 310,
                                            price_format: '310 ₽',
                                        },
                                        {
                                            id: '10',
                                            image: 'https://restauranto.8up.ru/upload/resize_cache/iblock/600/500_500_2/37os2z5gwu4jojnl04xiku8ro5l0b1be.png',
                                            is_hit: false,
                                            is_new: false,
                                            name: 'Борщ с тефтелей из телятины',
                                            price: 499,
                                            price_format: '499 ₽',
                                        },
                                    ]"/>
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
        setup() {
            onMounted(async () => {
                await store.dispatch('basket/getItems');
            });

            const items = computed(() => {
                return store.getters['basket/items']
            });

            return {
                items
            };
        }
    }
</script>
