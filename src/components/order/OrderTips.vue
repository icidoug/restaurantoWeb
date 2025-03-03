<template>
    <div class="order-tips">
        <div class="order-tips__header">
            {{ $t('tips') }} {{ tipsSum > 0 ? $formatCurrency(tipsSum) : '' }}
        </div>
        <your-waiter :waiter="waiter"/>
        <div class="order-tips__items">
            <div class="order-tips__item"
                 :class="{active: tipsType === '10%'}"
                 @click="setTips('10%')"
            >
                <div class="order-tips__item_percent">
                    10%
                </div>
                <div class="order-tips__item_sum">
                    {{ $formatCurrency(parseFloat(sum * .1)) }}
                </div>
            </div>
            <div class="order-tips__item"
                 :class="{active: tipsType === '15%'}"
                 @click="setTips('15%')"
            >
                <div class="order-tips__item_percent">
                    15%
                </div>
                <div class="order-tips__item_sum">
                    {{ $formatCurrency(parseFloat(sum * .15)) }}
                </div>
            </div>
            <div class="order-tips__item"
                 :class="{active: tipsType === '20%'}"
                 @click="setTips('20%')"
            >
                <div class="order-tips__item_percent">
                    20%
                </div>
                <div class="order-tips__item_sum">
                    {{ $formatCurrency(parseFloat(sum * .2)) }}
                </div>
            </div>
            <div class="order-tips__item"
                 :class="{active: tipsType === 'custom'}"
                 @click="setTips('custom')"
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
        <div v-if="tipsType === 'custom'" class="order-tips__input">
            <input type="text"
                   :value="customTipsSum"
                   @keypress="isNumber($event)"
                   @keyup="setCustomTips($event.target.value)"
                   @change="checkSum($event.target.value)"
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.48989 6.53795L3.41889 10.838C2.92189 11.533 2.92189 12.468 3.41889 13.163L6.48989 17.463C6.86489 17.988 7.47089 18.3 8.11689 18.3H18.9999C20.1049 18.3 20.9999 17.405 20.9999 16.3V7.69995C20.9999 6.59495 20.1049 5.69995 18.9999 5.69995H8.11689C7.47089 5.69995 6.86489 6.01195 6.48989 6.53795Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 10L12 14" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 14L12 10" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <waiter-review/>
    </div>
</template>

<script>

    import YourWaiter from "@/components/waiter/YourWaiter.vue";
    import WaiterReview from "@/components/waiter/WaiterReview.vue";
    import {computed, ref, watch} from "vue";
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
                return store.getters['order/sumWithoutTips']
            });

            const tipsSum = computed(() => {
                return store.getters['order/tipsSum']
            });

            const waiter = computed(() => {
                return store.getters['waiter/waiter']
            });

            watch(() => sum.value, (newSum) => {
                if(tipsType.value !== 'none') {
                    setTips(tipsType.value, true)
                }
            });

            const customTipsSum = ref(0);

            const setTips = (type, force = false) => {
                let tips = 0
                if(tipsType.value === type && !force) {
                    type = 'none';
                }
                if(type === '10%') {
                    tips = parseFloat(sum.value * .1);
                }
                else if(type === '15%') {
                    tips = parseFloat(sum.value * .15);
                }
                else if(type === '20%') {
                    tips = parseFloat(sum.value * .2);
                }
                else if(type === 'custom') {
                    tips = customTipsSum.value;
                }
                store.commit('order/setTipsType', type);
                store.commit('order/setTipsSum', tips);
            }

            const setCustomTips = (value) => {
                const sum = value > 0  ? value.replace(/^0+/, '') : '';

                customTipsSum.value = sum === '' ? '' : parseFloat(sum);
                store.commit('order/setTipsSum', sum === '' ? '' : parseFloat(sum));
            }

            const checkSum = (value) => {
                if(value === '') {
                    customTipsSum.value = 0;
                    store.commit('order/setTipsSum', 0);
                }
            }

            const isNumber = ($event) => {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                    $event.preventDefault();
                }
            }

            return {
                tipsType,
                sum,
                setTips,
                tipsSum,
                waiter,
                customTipsSum,
                setCustomTips,
                isNumber,
                checkSum
            }
        }
    }
</script>

<style lang="scss">

</style>
