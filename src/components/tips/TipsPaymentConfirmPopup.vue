<template>
    <f7-popup
        class="popup-bottom tips-payment-popup"
        swipe-to-close="to-bottom"
        swipe-handler=".swipe-handler"
    >
        <div class="swipe-handler">
            <div class="swipe-handler__icon"></div>
        </div>
        <f7-link popup-close class="waiter-popup__close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z" fill="#898989"/>
            </svg>
        </f7-link>
        <div class="popup__wrapper">
            <div v-if="isPaid" class="basket-confirm">
                <div class="basket-confirm__icon">
                    <svg width="29" height="26" viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8187 2.00075C18.0717 1.97547 16.4335 2.5698 15.3319 4.22216C15.1464 4.50035 14.8342 4.66744 14.4998 4.66744C14.1655 4.66745 13.8533 4.50035 13.6678 4.22216C12.5722 2.57889 10.9044 2.00085 9.16651 2.00085C5.66413 2.00085 2.1665 4.93948 2.1665 9.00056C2.1665 13.2381 4.9062 16.9869 7.99995 19.7549C9.52888 21.1229 11.0991 22.2095 12.3604 22.9502C12.9915 23.3209 13.5345 23.5986 13.9468 23.78C14.1538 23.8711 14.3161 23.9327 14.4327 23.9696C14.4601 23.9783 14.4824 23.9848 14.4998 23.9896C14.5173 23.9848 14.5396 23.9783 14.567 23.9696C14.6835 23.9327 14.8459 23.8711 15.0528 23.78C15.4652 23.5986 16.0082 23.3209 16.6393 22.9502C17.9006 22.2095 19.4708 21.1229 20.9997 19.7549C24.0935 16.9869 26.8332 13.238 26.8332 9.00056C26.8332 4.95114 23.3453 2.05177 19.8187 2.00075ZM14.4978 2.08006C16.0043 0.526265 17.964 -0.0262994 19.8476 0.000955447C24.321 0.0656814 28.8332 3.71702 28.8332 9.00056C28.8332 14.0961 25.5729 18.347 22.3333 21.2454C20.6955 22.7107 19.0157 23.874 17.6521 24.6748C16.9706 25.075 16.3574 25.391 15.8583 25.6106C15.6095 25.7201 15.3773 25.8108 15.1716 25.8761C14.9911 25.9333 14.7442 26 14.4998 26C14.2554 26 14.0086 25.9333 13.8281 25.8761C13.6223 25.8108 13.3901 25.7201 13.1414 25.6106C12.6422 25.391 12.029 25.075 11.3476 24.6748C9.98394 23.874 8.30414 22.7107 6.66639 21.2454C3.42681 18.347 0.166504 14.0961 0.166504 9.00056C0.166504 3.72868 4.66888 0.000852212 9.16651 0.000852212C11.0003 0.000852212 12.9798 0.529031 14.4978 2.08006Z" fill="white"/>
                    </svg>
                </div>
                <div class="basket-confirm__title">
                    {{ $t('thank_you') }}
                </div>
                <div class="basket-confirm__descr">
                    {{ $t('we_received_your_tip') }}
                </div>
            </div>
            <div v-else class="basket-confirm">
                <div class="basket-confirm__icon error">
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.792893 0.292893C1.18342 -0.0976311 1.81658 -0.0976311 2.20711 0.292893L9.5 7.58579L16.7929 0.292893C17.1834 -0.0976311 17.8166 -0.0976311 18.2071 0.292893C18.5976 0.683417 18.5976 1.31658 18.2071 1.70711L10.9142 9L18.2071 16.2929C18.5976 16.6834 18.5976 17.3166 18.2071 17.7071C17.8166 18.0976 17.1834 18.0976 16.7929 17.7071L9.5 10.4142L2.20711 17.7071C1.81658 18.0976 1.18342 18.0976 0.792893 17.7071C0.402369 17.3166 0.402369 16.6834 0.792893 16.2929L8.08579 9L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z" fill="white"/>
                    </svg>
                </div>
                <div class="basket-confirm__title">
                    {{ $t('something_went_wrong') }}
                </div>
                <div class="basket-confirm__descr">
                    {{ $t('something_went_wrong') }}
                </div>
                <f7-button class="btn btn--border" popup-close>
                    {{ $t('to_retry') }}
                </f7-button>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import Preloader from "@/components/Preloader.vue";
    import {computed, onMounted} from 'vue'
    import store from "@/store/store";

    export default {
        components: {
            Preloader
        },
        props: {
            /*isLoading: {
                type: Boolean,
                required: true,
            },*/
        },
        setup() {
            const isPaid = computed(() => {
                return store.getters['tips/isPaid']
            });

            return {
                isPaid
            }
        }
    };
</script>

<style lang="scss">

</style>
