<template>
    <f7-popup
        swipe-to-close="to-bottom"
        swipe-handler=".swipe-handler"
        class="popup-bottom waiter-popup"
    >
        <div class="swipe-handler">
            <div class="swipe-handler__icon"></div>
        </div>
        <f7-link popup-close class="waiter-popup__close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                      fill="#898989"/>
            </svg>
        </f7-link>
        <div class="waiter-popup__wrapper">
            <div v-if="waiter.id" class="waiter-popup__header">
                <div class="waiter-popup__image">
                    <img v-if="waiter.image" :src="waiter.image">
                </div>
                <div class="waiter-popup__subtitle">
                    {{ $t('your_waiter') }}
                </div>
                <div class="waiter-popup__title">
                    {{ waiter.name }}
                </div>
            </div>
            <div class="waiter-popup__form">
                <div class="waiter-popup__form_label">
                    {{ $t('add_comment') }}
                </div>
                <textarea :placeholder="$t('what_you_need')" v-model="comment"></textarea>
                <f7-button class="btn btn--pink" @click="callWaiter">
                    {{ $t('call_waiter') }}
                </f7-button>
                <waiter-confirm-popup :minutes-difference="minutesDifference" :is-loading="isFetching" :is-error="isWaiterCallError"/>
                <f7-button class="btn btn--border" @click="callHookah">
                    {{ $t('call_hookah_man') }}
                </f7-button>
                <hookah-confirm-popup :minutes-difference="minutesDifferenceHookah" :is-loading="isFetching" :is-error="isHookahCallError"/>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import store from "@/store/store";
    import {ref} from "vue";
    import WaiterConfirmPopup from "@/components/waiter/WaiterConfirmPopup.vue";
    import {f7} from 'framework7-vue';
    import HookahConfirmPopup from "@/components/waiter/HookahConfirmPopup.vue";

    export default {
        components: {HookahConfirmPopup, WaiterConfirmPopup},
        props: {
            waiter: {
                type: Object,
                required: true
            },
        },
        setup() {
            const comment = ref('');
            const isFetching = ref(true);
            const isWaiterCallError = ref(false);
            const isHookahCallError = ref(false);

            let nowTime = new Date().getTime();
            const minutesDifference = ref(localStorage.waiterFinishTime > nowTime ? (localStorage.waiterFinishTime - nowTime) / 1000 : 0);
            const callWaiter = async () => {
                isWaiterCallError.value = false;
                isFetching.value = true;
                f7.popup.close('.waiter-popup');
                f7.popup.open('.waiter-confirm-popup');

                nowTime = new Date().getTime();
                minutesDifference.value = localStorage.waiterFinishTime > nowTime ? (localStorage.waiterFinishTime - nowTime) / 1000 : 0;
                if (minutesDifference.value === 0) {
                    const isSuccess = await store.dispatch('waiter/call', comment.value);
                    if(isSuccess === true) {
                        await new Promise(r => setTimeout(r, 2000));

                        const date = new Date(Date.now() + (2 * 60 * 1000));
                        localStorage.waiterFinishTime = date.getTime();

                        minutesDifference.value = 2 * 60;
                    }
                    else {
                        isWaiterCallError.value = true;
                    }
                }

                isFetching.value = false;
            }

            const minutesDifferenceHookah = ref(localStorage.hookahFinishTime > nowTime ? (localStorage.hookahFinishTime - nowTime) / 1000 : 0);
            const callHookah = async () => {
                isHookahCallError.value = false;
                isFetching.value = true
                f7.popup.close('.waiter-popup');
                f7.popup.open('.hookah-confirm-popup');

                nowTime = new Date().getTime();
                minutesDifferenceHookah.value = localStorage.hookahFinishTime > nowTime ? (localStorage.hookahFinishTime - nowTime) / 1000 : 0;
                if (minutesDifferenceHookah.value === 0) {
                    const isSuccess = await store.dispatch('waiter/callHookah', comment.value);
                    if(isSuccess === true) {
                        await new Promise(r => setTimeout(r, 2000));

                        const date = new Date(Date.now() + (2 * 60 * 1000));
                        localStorage.hookahFinishTime = date.getTime();

                        minutesDifferenceHookah.value = 2 * 60;
                    }
                    else {
                        isHookahCallError.value = true;
                    }
                }

                isFetching.value = false;
            }

            return {
                comment,
                callWaiter,
                isFetching,
                minutesDifference,
                minutesDifferenceHookah,
                callHookah,
                isWaiterCallError,
                isHookahCallError
            }
        }
    }
</script>

<style lang="scss">

</style>
