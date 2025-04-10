<template>
    <f7-popup
        swipe-to-close="to-bottom"
        swipe-handler=".swipe-handler"
        class="popup-bottom contacts-popup"
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
        <div class="wifi-popup__wrapper">
            <div class="wifi-popup__title">
                {{ $t('contacts') }}
            </div>
            <div class="wifi-popup__form">
                <div v-if="partner?.name" class="wifi-popup__form_group">
                    <div class="wifi-popup__form_label">
                        {{ $t('name') }}
                    </div>
                    <div class="wifi-popup__form_field">
                        <input type="text" readonly :value="partner?.name">
                    </div>
                </div>
                <div v-if="partner?.address" class="wifi-popup__form_group">
                    <div class="wifi-popup__form_label">
                        {{ $t('address') }}
                    </div>
                    <div class="wifi-popup__form_field">
                        <input type="text" readonly :value="partner?.address">
                    </div>
                </div>
                <div v-if="partner?.contacts?.phone" class="wifi-popup__form_group">
                    <div class="wifi-popup__form_label">
                        {{ $t('phone') }}
                    </div>
                    <div class="wifi-popup__form_field">
                        <a class="external" :href="'tel:' + partner?.contacts?.phone?.replace(/[\s()-]/g, '')">{{ partner?.contacts?.phone }}</a>
                    </div>
                </div>
                <div v-if="partner?.contacts?.email" class="wifi-popup__form_group">
                    <div class="wifi-popup__form_label">
                        {{ $t('email') }}
                    </div>
                    <div class="wifi-popup__form_field">
                        <a class="external" :href="'mailto:' + partner?.contacts?.email">{{ partner?.contacts?.email }}</a>
                    </div>
                </div>
                <div v-if="partner?.contacts?.work_hours" class="wifi-popup__form_group">
                    <div class="wifi-popup__form_label">
                        {{ $t('work_hours') }}
                    </div>
                    <div class="wifi-popup__form_field">
                        <input type="text" readonly :value="partner?.contacts?.work_hours">
                    </div>
                </div>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import {ref} from "vue";

    export default {
        components: {},
        props: {
            partner: {
                type: Object,
                required: true
            },
        },
        setup() {

            return {}
        }
    }
</script>

<style lang="scss">

</style>
