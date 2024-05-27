<template>
    <f7-popup class="order-payment-popup" :opened="isOpenModal">
        <f7-link @click="closeModal" class="popup-close-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                      fill="#898989"/>
            </svg>
        </f7-link>
        <div v-if="isFetching" class="order-payment-popup__preloader">
            <preloader/>
        </div>
        <div id="paydala-frame" class="order-payment-popup__iframe" :class="{'hide': isFetching}"></div>
    </f7-popup>
</template>

<script setup>
    import {ref, computed, onMounted} from 'vue';
    import store from '@/store/store';
    import axios from 'axios';
    import Preloader from "@/components/Preloader.vue";

    const props = defineProps({
        type: String,
        commission: Boolean,
    });

    const isFetching = computed(() => store.getters['order/isPaymentFetching']);
    const isOpenModal = computed(() => store.getters['order/isOpenPayDalaModal']);
    const paydalaInstance = ref(null);

    const closeModal = () => {
        store.commit('order/setIsOpenPayDalaModal', false);
    };

    const clearPaydalaFrame = () => {
        const frame = document.getElementById('paydala-frame');
        if (frame) {
            frame.innerHTML = '';
        }
    };

    const initiatePayment = async () => {
        clearPaydalaFrame();

        try {
            const response = await store.dispatch('order/pay', {
                type: props.type,
                commission: props.commission
            });
            console.log('response', response)

            if (response.data.success) {
                configurePaydala(response.data.response);
            } else {
                alert("Payment failed! Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred! Please check your connection.");
        }
    };

    const configurePaydala = (credentials) => {
        const config = {
            environment: "sandbox",
            operatorCredentials: credentials,
            onClose: function (data) {
                //alert("Session Closed: " + JSON.stringify(data));
                paydalaInstance.value.unmount();
                closeModal();
            },
            onTransactionComplete: function (data) {
                //alert("Transaction Complete: " + JSON.stringify(data));
                setTimeout(() => {
                    paydalaInstance.value.unmount();
                    location.reload();
                }, 1500)
            },
        };

        paydalaInstance.value.setPaydalaConfig(config);
        paydalaInstance.value.mount({
            divId: "paydala-frame",
            iframeStyles: {
                width: "50%",
                height: "100%",
            },
            onSdkLoaded: () => console.log("SDK loaded"),
        });
    };

    onMounted(() => {
        const script = document.createElement('script');
        script.src = "https://storage.googleapis.com/paydala-js-sdk/index.bundle.js";
        script.async = true;
        script.onload = function () {
            const functionName = "PaydalaIframeSDK";
            const fn = window[functionName];
            if (typeof fn === "function") {
                paydalaInstance.value = fn();
            } else {
                console.error("Function '" + functionName + "' not found");
            }
        };
        script.onerror = function () {
            console.error("Error loading script '" + script.src + "'");
        };
        document.body.appendChild(script);
    });

    defineExpose({
        initiatePayment
    })

</script>

<style lang="scss">
/* Your styles here */
</style>
