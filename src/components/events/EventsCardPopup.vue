<template>
    <f7-popup class="events-detail-popup" :opened="isOpenModal">
        <f7-link @click="closeModal" class="events-detail-popup__close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                      fill="#898989"/>
            </svg>
        </f7-link>
        <div v-if="isFetching" class="events-detail__preloader">
            <preloader/>
        </div>
        <div v-else class="page" id="detail_item">
            <div class="events-detail__header">
                <img v-if="item.image && item.image !== ''" :src="item.image">
                <svg v-else width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 16L22 16" stroke="#cd005d" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M4 19L20 19" stroke="#cd005d" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="#cd005d" stroke-width="1.5"></path>
                    <path
                        d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 9.99999 3.89543 9.99999 5C9.99999 5.36429 10.0974 5.70583 10.2676 6"
                        stroke="#cd005d" stroke-width="1.5"></path>
                </svg>
            </div>
            <div class="page-content">
                <div class="events-detail">
                    <div class="events-detail__wrapper">
                        <div v-if="item.date" class="events-detail__date">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.3334 0.0666656C5.66477 0.0666656 5.9334 0.335295 5.9334 0.666666V0.746509C6.44522 0.733328 7.03097 0.73333 7.70655 0.733332L7.7334 0.733332H8.26673L8.29358 0.733332C8.96916 0.73333 9.55491 0.733328 10.0667 0.746509V0.666666C10.0667 0.335295 10.3354 0.0666656 10.6667 0.0666656C10.9981 0.0666656 11.2667 0.335295 11.2667 0.666666V0.821939C11.8288 0.888577 12.3115 1.0087 12.7551 1.2347C13.6206 1.67572 14.3243 2.37943 14.7654 3.24498C15.0336 3.77148 15.1527 4.35317 15.2102 5.05728C15.2667 5.74876 15.2667 6.60912 15.2667 7.7065V7.73333V8.26667V8.2935C15.2667 9.39088 15.2667 10.2512 15.2102 10.9427C15.1527 11.6468 15.0336 12.2285 14.7654 12.755C14.3243 13.6206 13.6206 14.3243 12.7551 14.7653C12.2286 15.0336 11.6469 15.1526 10.9428 15.2102C10.2513 15.2667 9.39095 15.2667 8.29356 15.2667H8.26673H7.7334H7.70657C6.60918 15.2667 5.74883 15.2667 5.05735 15.2102C4.35323 15.1526 3.77155 15.0336 3.24504 14.7653C2.3795 14.3243 1.67579 13.6206 1.23477 12.755C0.966501 12.2285 0.847416 11.6468 0.789888 10.9427C0.733392 10.2512 0.733395 9.39089 0.733398 8.29351L0.733399 8.26667V7.73333L0.733398 7.70648C0.733395 6.60911 0.733392 5.74876 0.789888 5.05728C0.847416 4.35317 0.966501 3.77148 1.23477 3.24498C1.67579 2.37943 2.3795 1.67572 3.24504 1.2347C3.68859 1.0087 4.17131 0.888577 4.7334 0.821939V0.666666C4.7334 0.335295 5.00203 0.0666656 5.3334 0.0666656ZM4.7334 2.03206C4.33231 2.08943 4.03899 2.17696 3.78983 2.30391C3.15008 2.62988 2.62995 3.15001 2.30398 3.78976C2.13627 4.11891 2.03737 4.5251 1.9859 5.155C1.93387 5.79191 1.9334 6.60333 1.9334 7.73333V8.26667C1.9334 9.39667 1.93387 10.2081 1.9859 10.845C2.03737 11.4749 2.13627 11.8811 2.30398 12.2102C2.62995 12.85 3.15008 13.3701 3.78983 13.6961C4.11897 13.8638 4.52516 13.9627 5.15507 14.0142C5.79197 14.0662 6.60339 14.0667 7.7334 14.0667H8.26673C9.39674 14.0667 10.2082 14.0662 10.8451 14.0142C11.475 13.9627 11.8812 13.8638 12.2103 13.6961C12.8501 13.3701 13.3702 12.85 13.6962 12.2102C13.8639 11.8811 13.9628 11.4749 14.0142 10.845C14.0663 10.2081 14.0667 9.39667 14.0667 8.26667V7.73333C14.0667 6.60333 14.0663 5.79191 14.0142 5.155C13.9628 4.5251 13.8639 4.11891 13.6962 3.78976C13.3702 3.15001 12.85 2.62988 12.2103 2.30391C11.9611 2.17696 11.6678 2.08943 11.2667 2.03206V2.66667C11.2667 2.99804 10.9981 3.26667 10.6667 3.26667C10.3354 3.26667 10.0667 2.99804 10.0667 2.66667V1.94687C9.57009 1.93352 8.98228 1.93333 8.26673 1.93333H7.7334C7.01785 1.93333 6.43004 1.93352 5.9334 1.94687V2.66667C5.9334 2.99804 5.66477 3.26667 5.3334 3.26667C5.00203 3.26667 4.7334 2.99804 4.7334 2.66667V2.03206ZM4.06673 5.33333C4.06673 5.00196 4.33536 4.73333 4.66673 4.73333H11.3334C11.6648 4.73333 11.9334 5.00196 11.9334 5.33333C11.9334 5.6647 11.6648 5.93333 11.3334 5.93333H4.66673C4.33536 5.93333 4.06673 5.6647 4.06673 5.33333ZM9.40006 11.3333C9.40006 11.002 9.66869 10.7333 10.0001 10.7333H11.3334C11.6648 10.7333 11.9334 11.002 11.9334 11.3333C11.9334 11.6647 11.6648 11.9333 11.3334 11.9333H10.0001C9.66869 11.9333 9.40006 11.6647 9.40006 11.3333Z" fill="#D2015F"/>
                            </svg>
                            <span>{{ item.date }}</span>
                        </div>
                        <div class="events-detail__title">
                            {{ item.name }}
                        </div>
                        <div class="events-detail__line"></div>
                        <div v-if="item.description" class="events-detail__subtitle">
                            {{ $t('details') }}
                        </div>
                        <div v-if="item.description" class="events-detail__descr">
                            {{ item.description }}
                        </div>
                        <div class="events-detail__line"></div>
                        <div v-if="item.date" class="events-detail__subtitle">
                            {{ $t('conditions') }}
                        </div>
                        <div v-if="item.date" class="events-detail__conditions">
                            <span>{{ $t('date') }}: {{ item.date }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="events-detail__footer">
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
    </f7-popup>
</template>

<script>
    import {computed} from 'vue'
    import store from '@/store/store'
    import Preloader from "@/components/Preloader.vue";

    export default {
        components: {
            Preloader,
        },
        setup() {
            const isOpenModal = computed(() => {
                return store.getters['events/isOpenModal']
            });

            const isFetching = computed(() => {
                return store.getters['events/isDetailFetching']
            });

            const item = computed(() => {
                return store.getters['events/detailItem']
            });

            const closeModal = () => {
                store.commit('events/setIsOpenModal', false);
            }

            return {
                isOpenModal,
                closeModal,
                isFetching,
                item,
            }
        }
    }
</script>

<style lang="scss">

</style>
