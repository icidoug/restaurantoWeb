<template>
    <f7-popup
              class="popup-bottom order-confirm-popup"
              :close-by-backdrop-click="false"
              :close-on-escape="false"
    >
<!--        <f7-link popup-close class="waiter-popup__close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z" fill="#898989"/>
            </svg>
        </f7-link>-->
        <div class="popup__wrapper">
            <div v-if="isLoading" class="basket-confirm-loading">
                <preloader/>
            </div>
            <div v-else class="basket-confirm">

            </div>
        </div>
    </f7-popup>
</template>

<script>
    import Preloader from "@/components/Preloader.vue";
    import {onMounted} from 'vue'
    import store from "@/store/store";

    export default {
        components: {
            Preloader
        },
        props: {
            isLoading: {
                type: Boolean,
                required: true,
            },
        },
        setup() {
        }
    };
</script>

<style lang="scss">

</style>
