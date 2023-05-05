<template>
    <f7-popup class="item-detail-popup" :opened="isOpenModal">
        <f7-link @click="closeModal" class="item-detail-popup__close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                      fill="#898989"/>
            </svg>
        </f7-link>
        <div class="page">
            <div class="item-detail__header">
                <img src="/src/assets/images/card.png">
            </div>
            <div class="page-content">
                <div class="item-detail">
                    <div class="item-detail__wrapper">
                        <div class="item-detail__tags">
                            <div class="tag tag--green">Новинка</div>
                            <div class="tag tag--purple">Хит</div>
                        </div>
                        <div class="item-detail__title">
                            Крок-месье
                        </div>
                        <div class="item-detail__descr">
                            нежный ростбиф и цукини, запечённые под сырным соусом и сыром «Ламбер» на воздушной булочке
                            «Бриошь»
                        </div>
                        <div class="item-detail__info">
                            <div class="item-detail__price">
                                589₽
                            </div>
                            <div class="item-detail__weight">
                                140г
                            </div>
                        </div>
                        <div class="item-detail__btn btn btn--pink">
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M8.5 0.25C8.91421 0.25 9.25 0.585786 9.25 1V7.25H15.5C15.9142 7.25 16.25 7.58579 16.25 8C16.25 8.41421 15.9142 8.75 15.5 8.75H9.25V15C9.25 15.4142 8.91421 15.75 8.5 15.75C8.08579 15.75 7.75 15.4142 7.75 15V8.75H1.5C1.08579 8.75 0.75 8.41421 0.75 8C0.75 7.58579 1.08579 7.25 1.5 7.25H7.75V1C7.75 0.585786 8.08579 0.25 8.5 0.25Z"
                                      fill="white"/>
                            </svg>
                            Добавить в заказ
                        </div>
                        <div class="item-detail__line"></div>
                        <div class="item-detail__subtitle">
                            Состав
                        </div>
                        <div class="item-detail__descr">
                            Ростбиф, Салат Айсберг, Цукини, Сырный соус, Сыр «Ламбер»
                        </div>
                        <div class="item-detail__line"></div>
                        <div class="item-detail__subtitle">
                            С этим блюдом покупают
                        </div>
                        <catalog-buy-with/>
                        <div class="item-detail__line"></div>
                        <div class="item-detail__subtitle">
                            Оцените блюдо
                        </div>
                        <catalog-detail-reviews/>
                        <div class="item-detail__line"></div>
                    </div>
                </div>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import {ref, computed} from 'vue'
    import store from '@/store/store'
    import CatalogBuyWith from "@/components/catalog/CatalogBuyWith.vue";
    import CatalogDetailReviews from "@/components/catalog/CatalogDetailReviews.vue";

    export default {
        components: {
            CatalogBuyWith,
            CatalogDetailReviews
        },
        setup() {
            const isOpenModal = computed(() => {
                return store.getters['catalog/isOpenModal']
            });

            const closeModal = () => {
                console.log('close')
                store.commit('catalog/setIsOpenModal', false);
            }

            return {
                isOpenModal,
                closeModal
            }
        }
    }
</script>

<style lang="scss">

</style>
