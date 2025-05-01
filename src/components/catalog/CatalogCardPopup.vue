<template>
    <f7-popup class="item-detail-popup" :opened="isOpenModal">
        <f7-link @click="closeModal" class="popup-close-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                      fill="#898989"/>
            </svg>
        </f7-link>
        <div v-if="isFetching" class="item-detail__preloader">
            <preloader/>
        </div>
        <div v-else class="page" id="detail_item">
            <div class="item-detail__header">
                <img v-if="item.image && item.image !== ''" :src="item.image">
                <svg v-else-if="item.type === 'drink'" width="24" height="24" viewBox="-1.6 -1.6 35.20 35.20"
                     fill="#000000">
                    <path
                        d="M16,22c2.761,0,5-2.239,5-5s-2.239-5-5-5s-5,2.239-5,5S13.239,22,16,22z M16,13c2.206,0,4,1.794,4,4 c0,2.206-1.794,4-4,4s-4-1.794-4-4C12,14.794,13.794,13,16,13z M26,4l-0.772-2.316C25.092,1.275,24.71,1,24.279,1H7.721 C7.29,1,6.908,1.275,6.772,1.684L6,4C5.448,4,5,4.448,5,5v2c0,0.552,0.448,1,1,1h0.083l1.687,20.249C7.9,29.804,9.2,31,10.76,31 H21.24c1.56,0,2.86-1.196,2.99-2.751L25.917,8H26c0.552,0,1-0.448,1-1V5C27,4.448,26.552,4,26,4z M24.279,2l0.667,2H7.054l0.667-2 H24.279z M23.233,28.166C23.147,29.194,22.272,30,21.24,30H10.76c-1.032,0-1.907-0.806-1.993-1.834L7.087,8h17.826L23.233,28.166z M26,7H6V5h20V7z"/>
                </svg>
                <svg v-else width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 16L22 16" stroke="#cd005d" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M4 19L20 19" stroke="#cd005d" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="#cd005d"
                          stroke-width="1.5"></path>
                    <path
                        d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 9.99999 3.89543 9.99999 5C9.99999 5.36429 10.0974 5.70583 10.2676 6"
                        stroke="#cd005d" stroke-width="1.5"></path>
                </svg>
            </div>
            <div class="page-content">
                <div class="item-detail">
                    <div class="item-detail__wrapper">
                        <div class="item-detail__tags">
                            <div v-if="item.is_new" class="tag tag--green">{{ $t('new') }}</div>
                            <div v-if="item.is_hit" class="tag tag--purple">{{ $t('hit') }}</div>
                        </div>
                        <div class="item-detail__title">
                            {{ item.name }}
                        </div>
                        <div class="item-detail__descr">
                            {{ item.description }}
                        </div>
                        <div class="item-detail__info">
                            <div class="item-detail__price" v-html="item.price_format"></div>
                            <div class="item-detail__weight" v-if="item.weight">
                                {{ item.weight + 'g' }}
                            </div>
                        </div>
                        <counter v-if="!partner.only_menu"
                                 class="item-detail__btn"
                                 :value="quantity"
                                 @change="setQuantity($event)"
                                 btn-style="fill"
                                 :hasExtras="item.extra_sections && Object.keys(item.extra_sections).length > 0"
                                 @openExtrasPopup="isExtrasPopupOpen = true"
                        >
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                 class="svg-fill"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M8.5 0.25C8.91421 0.25 9.25 0.585786 9.25 1V7.25H15.5C15.9142 7.25 16.25 7.58579 16.25 8C16.25 8.41421 15.9142 8.75 15.5 8.75H9.25V15C9.25 15.4142 8.91421 15.75 8.5 15.75C8.08579 15.75 7.75 15.4142 7.75 15V8.75H1.5C1.08579 8.75 0.75 8.41421 0.75 8C0.75 7.58579 1.08579 7.25 1.5 7.25H7.75V1C7.75 0.585786 8.08579 0.25 8.5 0.25Z"
                                      fill="white"/>
                            </svg>
                            {{ $t('add_to_order') }}
                        </counter>
                        <div v-if="item.extras && item.extras.length > 0 && partner.id == 3267" class="extras">
                            <div class="extras__item">
                                <div class="item-detail__subtitle">
                                    {{ $t('extras') }}
                                </div>
                                <catalog-extras :item="item" :index="1"/>
                            </div>
                        </div>
                        <div v-else-if="item.extras && item.extras.length > 0 && quantity > 0" class="extras">
                            <div class="extras__item" v-for="i in quantity">
                                <div class="item-detail__subtitle">
                                    {{ $t('extras') + ' ' + i }}
                                </div>
                                <catalog-extras :item="item" :index="i"/>
                            </div>
                        </div>
                        <div v-if="item.compound" class="item-detail__subtitle">
                            {{ $t('ingredients') }}
                        </div>
                        <div v-if="item.compound" class="item-detail__descr">
                            {{ item.compound }}
                        </div>
                        <div class="item-detail__line"></div>
                        <div v-if="item.suitable_items && item.suitable_items.length > 0" class="item-detail__subtitle">
                            {{ $t('buy_with_this') }}
                        </div>
                        <catalog-buy-with v-if="item.suitable_items && item.suitable_items.length > 0"
                                          :items="item.suitable_items"/>
                        <div class="item-detail__line"></div>
                        <div class="item-detail__subtitle">
                            {{ $t('rate_dish') }}
                        </div>
                        <catalog-detail-reviews v-if="item.id" :id="item.id" :reviews="item.reviews || []"/>
                        <div class="item-detail__line"></div>
                    </div>
                </div>
            </div>
            <div v-if="isVisibleFooter && !partner.only_menu" class="item-detail__footer">
                <counter class="item-detail__btn"
                         :value="quantity"
                         @change="setQuantity($event)"
                         btn-style="fill"
                         :hasExtras="item.extra_sections && Object.keys(item.extra_sections).length > 0"
                         @openExtrasPopup="isExtrasPopupOpen = true"
                >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                         class="svg-fill"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M8.5 0.25C8.91421 0.25 9.25 0.585786 9.25 1V7.25H15.5C15.9142 7.25 16.25 7.58579 16.25 8C16.25 8.41421 15.9142 8.75 15.5 8.75H9.25V15C9.25 15.4142 8.91421 15.75 8.5 15.75C8.08579 15.75 7.75 15.4142 7.75 15V8.75H1.5C1.08579 8.75 0.75 8.41421 0.75 8C0.75 7.58579 1.08579 7.25 1.5 7.25H7.75V1C7.75 0.585786 8.08579 0.25 8.5 0.25Z"
                              fill="white"/>
                    </svg>
                    {{ $t('add_to_order') }}
                </counter>
                <item-extras-popup
                    v-if="item.extra_sections && Object.keys(item.extra_sections).length > 0"
                    :item="item"
                    :is-open="isExtrasPopupOpen"
                    @update:isOpen="isExtrasPopupOpen = $event"
                    @added="handleItemAdded"
                />
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import {ref, computed, onMounted} from 'vue'
    import store from '@/store/store'
    import CatalogBuyWith from "@/components/catalog/CatalogBuyWith.vue";
    import CatalogDetailReviews from "@/components/catalog/CatalogDetailReviews.vue";
    import Preloader from "@/components/Preloader.vue";
    import Counter from "@/components/Counter.vue";
    import HeightTransition from "@/components/HeightTransition.vue";
    import CatalogExtras from "@/components/catalog/CatalogExtras.vue";
    import ItemExtrasPopup from "@/components/catalog/ItemExtrasPopup.vue";
    //import $$ from "dom7";

    export default {
        components: {
            ItemExtrasPopup,
            CatalogExtras,
            Counter,
            Preloader,
            CatalogBuyWith,
            CatalogDetailReviews,
            HeightTransition
        },
        setup() {
            const isExtrasPopupOpen = ref(false)
            const isOpenModal = computed(() => {
                return store.getters['catalog/isOpenModal']
            });

            const isFetching = computed(() => {
                return store.getters['catalog/isDetailFetching']
            });

            const item = computed(() => {
                return store.getters['catalog/detailItem']
            });

            const quantity = computed(() => {
                return store.getters['basket/getItemQuantityById'](item.value?.id) || 0
            });

            const partner = computed(() => {
                return store.getters['partner/partner']
            });

            const closeModal = () => {
                store.commit('catalog/setIsOpenModal', false);
            }

            const setQuantity = (qnt) => {
                if (quantity.value !== qnt) {
                    if (qnt < quantity.value) {
                        const lastBasketItem = store.getters['basket/getLastItemById'](item.value?.id)
                        if (lastBasketItem.basket_id) {
                            store.dispatch('basket/remove', lastBasketItem.basket_id);
                        }
                    } else {
                        store.dispatch('basket/updateBasket', {
                            item: item.value,
                            quantity: qnt,
                        });
                    }
                }
            };

            const handleItemAdded = async () => {
                isExtrasPopupOpen.value = false;
            };

            const isVisibleFooter = ref(true);

            /*onMounted(() => {
                let detailItem = $$('#detail_item:not(.page-previous)');

                const scrollableDiv = detailItem.find('.page-content');
                const addBasketBtn = detailItem.find('.item-detail__btn');

                scrollableDiv.on('scroll', () => {
                    const scrollTop = scrollableDiv.scrollTop();
                    const addBasketBtnOffsetTop = addBasketBtn[0].offsetTop;
                    console.log('scrollTop', scrollTop)
                    console.log('addBasketBtnOffsetTop', addBasketBtnOffsetTop)


                    isVisibleFooter.value = scrollTop > addBasketBtnOffsetTop + 50;
                });
            });*/

            return {
                isOpenModal,
                closeModal,
                isFetching,
                item,
                quantity,
                setQuantity,
                isVisibleFooter,
                partner,
                handleItemAdded,
                isExtrasPopupOpen
            }
        }
    }
</script>

<style lang="scss">

</style>
