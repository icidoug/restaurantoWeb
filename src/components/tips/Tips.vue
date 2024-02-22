<template>
    <div class="order-tips">
        <div class="order-tips__header">
            {{ $t('tips') }} {{ tipsSum > 0 ? tipsSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + $t('currency') : '' }}
        </div>
        <your-waiter :waiter="waiter"/>
        <div class="order-tips__items">
            <div class="order-tips__item"
                 :class="{active: tipsType === '10%'}"
                 @click="setTips('10%', parseInt(sum * .1))"
            >
                <div class="order-tips__item_percent">
                    10%
                </div>
                <div class="order-tips__item_sum">
                    {{ parseInt(sum * .1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}{{ $t('currency') }}
                </div>
            </div>
            <div class="order-tips__item"
                 :class="{active: tipsType === '15%'}"
                 @click="setTips('15%', parseInt(sum * .15))"
            >
                <div class="order-tips__item_percent">
                    15%
                </div>
                <div class="order-tips__item_sum">
                    {{ parseInt(sum * .15).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}{{ $t('currency') }}
                </div>
            </div>
            <div class="order-tips__item"
                 :class="{active: tipsType === '20%'}"
                 @click="setTips('20%', parseInt(sum * .2))"
            >
                <div class="order-tips__item_percent">
                    20%
                </div>
                <div class="order-tips__item_sum">
                    {{ parseInt(sum * .2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}{{ $t('currency') }}
                </div>
            </div>
            <div class="order-tips__item"
                 :class="{active: tipsType === 'custom'}"
                 @click="setTips('custom', 0)"
            >
                <div class="order-tips__item_title">
                    {{ $t('enter_your_amount') }}
                </div>
                <div class="order-tips__item_icon">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M6.46967 1.96967C6.76256 1.67678 7.23743 1.67678 7.53033 1.96967L11.0303 5.46963C11.171 5.61029 11.25 5.80105 11.25 5.99996C11.25 6.19888 11.171 6.38964 11.0303 6.5303L7.53033 10.0303C7.23744 10.3232 6.76256 10.3232 6.46967 10.0303C6.17678 9.7374 6.17678 9.26253 6.46967 8.96964L8.68934 6.74997H1.5C1.08579 6.74997 0.75 6.41418 0.75 5.99997C0.75 5.58575 1.08579 5.24997 1.5 5.24997H8.68933L6.46967 3.03033C6.17678 2.73744 6.17678 2.26257 6.46967 1.96967Z"
                              fill="#C8C8C8"/>
                    </svg>

                </div>
            </div>
        </div>
        <waiter-review/>
    </div>
</template>

<script>

    import YourWaiter from "@/components/waiter/YourWaiter.vue";
    import WaiterReview from "@/components/waiter/WaiterReview.vue";
    import {computed} from "vue";
    import store from "@/store/store";

    export default {
        components: {
            WaiterReview,
            YourWaiter
        },
        props: {},
        setup() {
            const tipsType = computed(() => {
                return store.getters['order/tipsType']
            });

            const sum = computed(() => {
                return store.getters['order/fullSum']
            });

            const tipsSum = computed(() => {
                return store.getters['order/tipsSum']
            });

            const waiter = computed(() => {
                return store.getters['waiter/waiter']
            });

            const setTips = (type, sum) => {
                if(tipsType.value === type) {
                    type = 'none';
                    sum = 0;
                }
                store.commit('order/setTipsType', type);
                store.commit('order/setTipsSum', sum);
            }

            return {
                tipsType,
                sum,
                setTips,
                tipsSum,
                waiter
            }
        }
    }
</script>

<style lang="scss">

</style>
