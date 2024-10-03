<template>
    <f7-page>
        <div class="basket">
            <navbar :title="$t('current_order')" share/>
            <basket-items v-if="items.length > 0" :items="items"/>
            <div v-else class="basket__empty padding-side">
                {{ $t('empty_cart') }}
            </div>
            <div class="basket__subtitle padding-side">
                {{ $t('recommended') }}
            </div>
            <div class="padding-side">
                <catalog-buy-with v-if="suitableItems && suitableItems.length > 0" :items="suitableItems"/>
            </div>
            <basket-form v-if="items.length > 0 && !partner.hide_confirm_order"/>
            <div v-if="partner.hide_confirm_order && !partner.hide_call_waiter" class="basket-form__footer">
                <f7-button class="btn btn--pink btn--arrow" popup-open=".waiter-popup">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16L22 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M4 19L20 19" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="white"
                              stroke-width="1.5"/>
                        <path
                            d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 5.36429 10.0974 5.70583 10.2676 6"
                            stroke="white" stroke-width="1.5"/>
                    </svg>
                    <span>{{ $t('call_waiter') }}</span>
                </f7-button>
            </div>
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
    import {sendAiSystemMessage} from "@/services/sendAiSystemMessage";

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
            const partner = computed(() => {
                return store.getters['partner/partner']
            });

            onMounted(async () => {
                await store.dispatch('basket/getItems');

                const sentEvents = JSON.parse(localStorage.getItem('sentEvents')) || [];
                if (!sentEvents.includes('beforeOrderCreate')) {
                    const response = await sendAiSystemMessage('beforeOrderCreate');
                    if (!response.error) {
                        window.widget.close();
                        setTimeout(() => {
                            window.widget.open();
                        }, 3000)

                        sentEvents.push('beforeOrderCreate');
                        localStorage.setItem('sentEvents', JSON.stringify(sentEvents))
                    }
                }
            });

            const items = computed(() => {
                return store.getters['basket/items']
            });

            const suitableItems = computed(() => {
                return store.getters['basket/suitableItems']
            });

            return {
                items,
                suitableItems,
                partner
            };
        },
        mounted() {
            console.log('this.$f7', this.f7router)
        }
    }
</script>
