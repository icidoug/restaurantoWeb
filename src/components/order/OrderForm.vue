<template>
    <div class="order-form">
        <div class="order-form__wrapper">
            <div class="order-form__table">
                <div class="order-form__th">
                    <div class="order-form__td">
                        {{ $t('total') }}:
                    </div>
                    <div class="order-form__td">
                        {{ totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}{{ $t('currency') }}
                    </div>
                </div>
                <div class="order-form__tr">
                    <div class="order-form__td">
                        {{ $t('dishes') }}
                    </div>
                    <div class="order-form__td">
                        {{ parseInt(sum - tipsSum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}{{
                            $t('currency')
                        }}
                    </div>
                </div>
                <div v-if="waiter.id" class="order-form__tr">
                    <div class="order-form__td">
                        {{ $t('tips') }}
                    </div>
                    <div class="order-form__td">
                        {{ tipsSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}{{ $t('currency') }}
                    </div>
                </div>
            </div>
            <div v-if="commission > 0" class="order-form__field"
                 :class="{active: taxChecked, hide: type === 'cash'}"
                 @click="taxChecked = !taxChecked"
            >
                <div class="order-form__field_checkbox"></div>
                <div class="order-form__field_title">
                    {{ $t('take_commission') }} {{ commission }}{{ $t('currency') }}
                </div>
            </div>
            <div class="order-form__field"
                 :class="{active: personalChecked, hide: type === 'cash'}"
                 @click="personalChecked = !personalChecked"
            >
                <div class="order-form__field_checkbox"></div>
                <div class="order-form__field_title">
                    {{ $t('agree_terms') }} <a @click.stop="openLink('/public/Public-offer-resto-ranto.pdf')"
                                               href="/public/Public-offer-resto-ranto.pdf"
                                               target="_blank">{{ $t('user_agreement') }}</a>
                    {{ $t('and') }} <a @click.stop="openLink('/public/Private-policy-resto-ranto.pdf')"
                                       href="/public/Private-policy-resto-ranto.pdf"
                                       target="_blank">{{ $t('personal_data') }}</a>
                </div>
            </div>
        </div>
        <div v-if="personalChecked && (!splitBill || (splitBill && sum > 0))" class="order-form__fixed">
            <f7-link class="order-payment" popup-open=".order-payment-type-popup">
                <div class="order-payment__main">
                    <div class="order-payment__icon">
                        <svg v-if="type === 'sbp'" width="22" height="26" viewBox="0 0 22 26" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.565918 5.79053L3.65822 11.3178V14.6893L0.569535 20.2057L0.565918 5.79053Z"
                                  fill="#5B57A2"/>
                            <path d="M12.439 9.30652L15.3366 7.53056L21.2667 7.52502L12.439 12.9329V9.30652Z"
                                  fill="#D90751"/>
                            <path d="M12.4225 5.758L12.4389 13.0759L9.33936 11.1714V0.232422L12.4225 5.758Z"
                                  fill="#FAB718"/>
                            <path d="M21.2666 7.52503L15.3363 7.53056L12.4225 5.758L9.33936 0.232422L21.2666 7.52503Z"
                                  fill="#ED6F26"/>
                            <path d="M12.4389 20.2364V16.6859L9.33936 14.8176L9.34106 25.7675L12.4389 20.2364Z"
                                  fill="#63B22F"/>
                            <path d="M15.3295 18.4766L3.658 11.3178L0.565918 5.79053L21.2542 18.4693L15.3295 18.4766Z"
                                  fill="#1487C9"/>
                            <path d="M9.34131 25.7675L12.4387 20.2364L15.3291 18.4766L21.2539 18.4694L9.34131 25.7675Z"
                                  fill="#017F36"/>
                            <path
                                d="M0.569336 20.2057L9.36468 14.8178L6.40772 13.0035L3.65802 14.6893L0.569336 20.2057Z"
                                fill="#984995"/>
                        </svg>
                        <svg v-else-if="type === 'card'" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.12"
                                  d="M2 8H22V14.6C22 16.8402 22 17.9603 21.564 18.816C21.1805 19.5686 20.5686 20.1805 19.816 20.564C18.9603 21 17.8402 21 15.6 21H8.4C6.15979 21 5.03968 21 4.18404 20.564C3.43139 20.1805 2.81947 19.5686 2.43597 18.816C2 17.9603 2 16.8402 2 14.6V8Z"
                                  fill="#656666"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M8.35719 2H8.4H15.6H15.6428C16.7266 1.99999 17.6007 1.99998 18.3086 2.05782C19.0375 2.11737 19.6777 2.24318 20.27 2.54497C21.2108 3.02433 21.9757 3.78924 22.455 4.73005C22.7568 5.32234 22.8826 5.96253 22.9422 6.69138C23 7.39923 23 8.27334 23 9.35707V9.35717V9.4V14.6V14.6428V14.6429C23 15.7267 23 16.6008 22.9422 17.3086C22.8826 18.0375 22.7568 18.6777 22.455 19.27C21.9757 20.2108 21.2108 20.9757 20.27 21.455C19.6777 21.7568 19.0375 21.8826 18.3086 21.9422C17.6008 22 16.7267 22 15.6429 22H15.6428H15.6H8.4H8.35717H8.35706C7.27334 22 6.39923 22 5.69138 21.9422C4.96253 21.8826 4.32234 21.7568 3.73005 21.455C2.78924 20.9757 2.02433 20.2108 1.54497 19.27C1.24318 18.6777 1.11737 18.0375 1.05782 17.3086C0.999982 16.6007 0.99999 15.7266 1 14.6428V14.6V9.4V9.35719V9.35719C0.99999 8.27341 0.999982 7.39925 1.05782 6.69138C1.11737 5.96253 1.24318 5.32234 1.54497 4.73005C2.02433 3.78924 2.78924 3.02433 3.73005 2.54497C4.32234 2.24318 4.96253 2.11737 5.69138 2.05782C6.39925 1.99998 7.2734 1.99999 8.35719 2H8.35719ZM5.85424 4.05118C5.24907 4.10062 4.90138 4.19279 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3.19279 5.90138 3.10062 6.24907 3.05118 6.85424C3.04729 6.90176 3.04371 6.95032 3.04039 7H20.9596C20.9563 6.95032 20.9527 6.90176 20.9488 6.85424C20.8994 6.24907 20.8072 5.90138 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C19.0986 4.19279 18.7509 4.10062 18.1458 4.05118C17.5289 4.00078 16.7366 4 15.6 4H8.4C7.26339 4 6.47108 4.00078 5.85424 4.05118ZM3 9.4L3.00012 9H20.9999L21 9.4V14.6C21 15.7366 20.9992 16.5289 20.9488 17.1458C20.8994 17.7509 20.8072 18.0986 20.673 18.362C20.3854 18.9265 19.9265 19.3854 19.362 19.673C19.0986 19.8072 18.7509 19.8994 18.1458 19.9488C17.5289 19.9992 16.7366 20 15.6 20H8.4C7.26339 20 6.47108 19.9992 5.85424 19.9488C5.24907 19.8994 4.90138 19.8072 4.63803 19.673C4.07354 19.3854 3.6146 18.9265 3.32698 18.362C3.19279 18.0986 3.10062 17.7509 3.05118 17.1458C3.00078 16.5289 3 15.7366 3 14.6V9.4ZM5.99988 11C5.44759 11 4.99988 11.4477 4.99988 12C4.99988 12.5523 5.44759 13 5.99988 13H9.99988C10.5522 13 10.9999 12.5523 10.9999 12C10.9999 11.4477 10.5522 11 9.99988 11H5.99988Z"
                                  fill="#656666"/>
                        </svg>
                        <svg v-else-if="type === 'cash'" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="6" width="20" height="12" rx="2" ry="2" stroke="#656666"></rect>
                            <circle cx="12" cy="12" r="3" stroke="#656666"></circle>
                            <line x1="6" y1="6" x2="6" y2="6" stroke="#656666"></line>
                            <line x1="18" y1="6" x2="18" y2="6" stroke="#656666"></line>
                            <line x1="6" y1="18" x2="6" y2="18" stroke="#656666"></line>
                            <line x1="18" y1="18" x2="18" y2="18" stroke="#656666"></line>
                        </svg>
                    </div>
                    <div class="order-payment__info">
                        <div class="order-payment__subtitle">
                            {{ $t('payment_method') }}
                        </div>
                        <div class="order-payment__selection">
                            {{ type === 'card' ? $t('bank_card') : $t('cash') }}
                        </div>
                    </div>
                </div>
                <div class="order-payment__arrow">
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M0.803166 0.46967C1.09606 0.176777 1.57093 0.176777 1.86383 0.46967L5.92102 4.52686C5.92687 4.53272 5.93272 4.53856 5.93856 4.5444C6.08843 4.69424 6.23107 4.83685 6.34144 4.96686C6.46178 5.10862 6.58713 5.28392 6.66082 5.51072C6.76415 5.82873 6.76415 6.17127 6.66082 6.48928C6.58713 6.71608 6.46178 6.89138 6.34144 7.03314C6.23107 7.16315 6.08843 7.30576 5.93856 7.4556L5.92102 7.47314L1.86383 11.5303C1.57093 11.8232 1.09606 11.8232 0.803166 11.5303C0.510273 11.2374 0.510273 10.7626 0.803166 10.4697L4.86036 6.41248C5.03412 6.23872 5.13213 6.13988 5.19793 6.06238C5.2187 6.03791 5.23087 6.02162 5.23741 6.01228C5.23862 6.00414 5.23862 5.99586 5.23741 5.98772C5.23087 5.97838 5.2187 5.96209 5.19793 5.93762C5.13213 5.86012 5.03412 5.76128 4.86036 5.58752L0.803166 1.53033C0.510273 1.23744 0.510273 0.762563 0.803166 0.46967Z"
                              fill="#C8C8C8"/>
                    </svg>
                </div>
            </f7-link>
            <f7-button v-if="type === 'cash' && !partner.hide_call_waiter" class="btn btn--pink btn--arrow" @click="openWaiterPopup"
                       popup-open=".waiter-popup">
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
            <f7-button v-else
                       class="btn btn--pink" @click="onSubmit"
            >
                {{ $t('pay') }} {{ splitBill ? ($t('in_part') + ' ') : '' }}
                {{ totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} {{ $t('currency') }}
            </f7-button>
        </div>
        <order-payment-type-popup @change="onChangeType($event)"/>
        <order-payment-result-popup :is-loading="isFetching"/>
        <order-payment-confirm-popup/>
        <order-pay-dala-popup ref="payDalaPopup" :type="type" :commission="taxChecked" :is-tips="false"/>
    </div>
</template>

<script setup>
    import store from '@/store/store'
    import {computed, onMounted, ref} from 'vue'
    import OrderPaymentTypePopup from "@/components/order/OrderPaymentTypePopup.vue";
    import OrderPaymentResultPopup from "@/components/order/OrderPaymentResultPopup.vue";
    import OrderPaymentConfirmPopup from "@/components/order/OrderPaymentConfirmPopup.vue";
    import OrderPayDalaPopup from "@/components/order/OrderPayDalaPopup.vue";
    import {f7} from "framework7-vue";

    onMounted(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const isOrderPaid = store.getters['order/isPaid'];
        if (urlParams.has('operation') && urlParams.has('reference') && !isOrderPaid) {
            if (urlParams.has('code') && urlParams.get('code') !== '1') {
                f7.popup.open('.order-payment-confirm-popup');
            }

            window.history.replaceState(null, '', window.location.pathname);
        }
    })
    const partner = computed(() => {
        return store.getters['partner/partner']
    });


    const isFetching = ref(false);
    const taxChecked = ref(!partner.value?.hide_online_payment);
    const personalChecked = ref(true);
    const type = ref(partner.value?.hide_online_payment ? 'cash' : 'card');

    const onChangeType = (newType) => {
        type.value = newType;
        if(newType === 'cash') {
            taxChecked.value = false;
        }
    }

    const waiter = computed(() => {
        return store.getters['waiter/waiter']
    });

    const sum = computed(() => {
        return store.getters['order/sum']
    });

    const tipsSum = computed(() => {
        return store.getters['order/tipsSum'].toFixed(2)
    });

    const splitBill = computed(() => {
        return store.getters['order/splitBill']
    });

    const isPaymentFetching = computed(() => {
        return store.getters['order/isPaymentFetching']
    });


    const commission = computed(() => {
        const percentFood = partner.value?.commission_food || 0;
        const percentTips = partner.value?.commission_tips || 0;
        const commissionSumFood = percentFood > 0 ? parseFloat(((sum.value - tipsSum.value) * (percentFood / 100))) : 0;
        const commissionSumTips = percentTips > 0 ? parseFloat((tipsSum.value * (percentTips / 100))) : 0;

        return roundNumber(commissionSumFood + commissionSumTips, 2)
    });

    const roundNumber = (num, scale) => {
        if (!("" + num).includes("e")) {
            return +(Math.round(num + "e+" + scale) + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = ""
            if (+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
        }
    }

    const totalSum = computed(() => {
        let totalSum = sum.value;
        if (taxChecked.value) {
            totalSum += commission.value;
        }
        return parseFloat(totalSum).toFixed(2);
    });

    const payDalaPopup = ref(null);

    const onSubmit = async () => {
        /*isFetching.value = true;
        await store.dispatch('order/pay', {
            type: type.value,
            commission: taxChecked.value
        });*/
        payDalaPopup.value.initiatePayment();
        store.commit('order/setIsPaymentFetching', true);
        store.commit('order/setIsOpenPayDalaModal', true);
        setTimeout(() => {
            store.commit('order/setIsPaymentFetching', false);
        }, 1500)
    };
    const openLink = (url) => {
        window.open(url)
    }
    const openWaiterPopup = () => {
        store.commit('waiter/setComment', 'Check');
    }
</script>

<style lang="scss">

</style>
