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
            <div class="waiter-popup__header">
                <div class="waiter-popup__image">
                    <img v-if="waiter.image" :src="waiter.image">
                </div>
                <div class="waiter-popup__subtitle">
                    Ваш официант
                </div>
                <div class="waiter-popup__title">
                    {{ waiter.name }}
                </div>
            </div>
            <div class="waiter-popup__form">
                <div class="waiter-popup__form_label">
                    Добавить комментарий
                </div>
                <textarea placeholder="Что вам нужно?" v-model="comment"></textarea>
                <div class="btn btn--pink" @click="callWaiter">
                    Позвать официанта
                </div>
                <div class="btn btn--border">
                    Позвать кальянщика
                </div>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import store from "@/store/store";
    import {ref} from "vue";

    export default {
        components: {},
        props: {
            waiter: {
                type: Object,
                required: true
            },
        },
        setup() {
            const comment = ref('');
            const callWaiter = () => {
                store.dispatch('waiter/call', comment.value)
            }
            return {
                comment,
                callWaiter
            }
        }
    }
</script>

<style lang="scss">

</style>
