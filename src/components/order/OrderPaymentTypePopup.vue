<template>
    <f7-popup
              swipe-to-close="to-bottom"
              swipe-handler=".swipe-handler"
              class="popup-bottom order-payment-type-popup"
    >
        <div class="swipe-handler">
            <div class="swipe-handler__icon"></div>
        </div>
        <div class="popup__wrapper">
            <div class="popup__header">
                {{ $t('payment_method') }}
            </div>
            <div class="popup-form">
                <div
                    v-if="!partner?.hide_online_payment"
                    class="popup-form__item"
                    :class="{active: selected === 'card'}"
                    @click="selected = 'card'"
                >
                    <div class="popup-form__item_title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.12" d="M2 8H22V14.6C22 16.8402 22 17.9603 21.564 18.816C21.1805 19.5686 20.5686 20.1805 19.816 20.564C18.9603 21 17.8402 21 15.6 21H8.4C6.15979 21 5.03968 21 4.18404 20.564C3.43139 20.1805 2.81947 19.5686 2.43597 18.816C2 17.9603 2 16.8402 2 14.6V8Z" fill="#656666"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.35719 2H8.4H15.6H15.6428C16.7266 1.99999 17.6007 1.99998 18.3086 2.05782C19.0375 2.11737 19.6777 2.24318 20.27 2.54497C21.2108 3.02433 21.9757 3.78924 22.455 4.73005C22.7568 5.32234 22.8826 5.96253 22.9422 6.69138C23 7.39923 23 8.27334 23 9.35707V9.35717V9.4V14.6V14.6428V14.6429C23 15.7267 23 16.6008 22.9422 17.3086C22.8826 18.0375 22.7568 18.6777 22.455 19.27C21.9757 20.2108 21.2108 20.9757 20.27 21.455C19.6777 21.7568 19.0375 21.8826 18.3086 21.9422C17.6008 22 16.7267 22 15.6429 22H15.6428H15.6H8.4H8.35717H8.35706C7.27334 22 6.39923 22 5.69138 21.9422C4.96253 21.8826 4.32234 21.7568 3.73005 21.455C2.78924 20.9757 2.02433 20.2108 1.54497 19.27C1.24318 18.6777 1.11737 18.0375 1.05782 17.3086C0.999982 16.6007 0.99999 15.7266 1 14.6428V14.6V9.4V9.35719V9.35719C0.99999 8.27341 0.999982 7.39925 1.05782 6.69138C1.11737 5.96253 1.24318 5.32234 1.54497 4.73005C2.02433 3.78924 2.78924 3.02433 3.73005 2.54497C4.32234 2.24318 4.96253 2.11737 5.69138 2.05782C6.39925 1.99998 7.2734 1.99999 8.35719 2H8.35719ZM5.85424 4.05118C5.24907 4.10062 4.90138 4.19279 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3.19279 5.90138 3.10062 6.24907 3.05118 6.85424C3.04729 6.90176 3.04371 6.95032 3.04039 7H20.9596C20.9563 6.95032 20.9527 6.90176 20.9488 6.85424C20.8994 6.24907 20.8072 5.90138 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C19.0986 4.19279 18.7509 4.10062 18.1458 4.05118C17.5289 4.00078 16.7366 4 15.6 4H8.4C7.26339 4 6.47108 4.00078 5.85424 4.05118ZM3 9.4L3.00012 9H20.9999L21 9.4V14.6C21 15.7366 20.9992 16.5289 20.9488 17.1458C20.8994 17.7509 20.8072 18.0986 20.673 18.362C20.3854 18.9265 19.9265 19.3854 19.362 19.673C19.0986 19.8072 18.7509 19.8994 18.1458 19.9488C17.5289 19.9992 16.7366 20 15.6 20H8.4C7.26339 20 6.47108 19.9992 5.85424 19.9488C5.24907 19.8994 4.90138 19.8072 4.63803 19.673C4.07354 19.3854 3.6146 18.9265 3.32698 18.362C3.19279 18.0986 3.10062 17.7509 3.05118 17.1458C3.00078 16.5289 3 15.7366 3 14.6V9.4ZM5.99988 11C5.44759 11 4.99988 11.4477 4.99988 12C4.99988 12.5523 5.44759 13 5.99988 13H9.99988C10.5522 13 10.9999 12.5523 10.9999 12C10.9999 11.4477 10.5522 11 9.99988 11H5.99988Z" fill="#656666"/>
                        </svg>
                        <span>{{ $t('bank_card') }}</span>
                    </div>
                    <div class="popup-form__item_checkbox"></div>
                </div>
                <div v-if="!tips" class="popup-form__item"
                     :class="{active: selected === 'cash'}"
                     @click="selected = 'cash'"
                >
                    <div class="popup-form__item_title">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="6" width="20" height="12" rx="2" ry="2" stroke="#656666"></rect>
                            <circle cx="12" cy="12" r="3" stroke="#656666"></circle>
                            <line x1="6" y1="6" x2="6" y2="6" stroke="#656666"></line>
                            <line x1="18" y1="6" x2="18" y2="6" stroke="#656666"></line>
                            <line x1="6" y1="18" x2="6" y2="18" stroke="#656666"></line>
                            <line x1="18" y1="18" x2="18" y2="18" stroke="#656666"></line>
                        </svg>
                        <span>
                            {{ $t('cash') }}
                        </span>
                    </div>
                    <div class="popup-form__item_checkbox"></div>
                </div>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import store from "@/store/store";

    export default {
        props: {
            tips: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                selected: store.getters['partner/partner']?.hide_online_payment ? 'cash' : 'card'
            };
        },
        computed: {
          partner() {
              return store.getters['partner/partner']
          }
        },
        watch: {
            selected(val) {
                this.$emit('change', val);
            },
        },
    };
</script>

<style lang="scss">

</style>
