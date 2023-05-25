<template>
    <div class="basket-form">
        <div class="basket-form__header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16L22 16" stroke="#333333" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M4 19L20 19" stroke="#333333" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="#333333" stroke-width="1.5"/>
                <path opacity="0.12" d="M20 16L4 16C4 10.4771 5.5 6 12 6C18.5 6 20 10.4771 20 16Z" fill="#333333"/>
                <path
                    d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 5.36429 10.0974 5.70583 10.2676 6"
                    stroke="#333333" stroke-width="1.5"/>
            </svg>
            <div class="basket-form__type">
                Подать заказ
                <f7-link popup-open=".order-type-popup">
                    {{ type === 'TABLE' ? 'к столу' : 'с собой' }}
                </f7-link>
            </div>
        </div>
        <div class="basket-form__textarea">
            <textarea v-model="comment" placeholder="Комментарий к заказу"></textarea>
            <div class="basket-form__prompt">
                Ваши особые предпочтения, порядок подачи блюд
            </div>
        </div>
        <div class="basket-form__footer">
            <f7-button class="btn btn--pink" popup-open=".order-confirm-popup" @click="onSubmit">Подтвердить заказ</f7-button>
        </div>
        <basket-order-type-popup @change="onChangeType($event)"/>
        <basket-order-confirm-popup :is-loading="isFetching"/>
    </div>
</template>

<script>
    import store from '@/store/store'
    import BasketOrderTypePopup from "@/components/basket/BasketOrderTypePopup.vue";
    import {ref} from 'vue'
    import BasketOrderConfirmPopup from "@/components/basket/BasketOrderConfirmPopup.vue";

    export default {
        components: {
            BasketOrderConfirmPopup,
            BasketOrderTypePopup
        },
        props: {},
        setup() {
            const type = ref('TABLE');
            const comment = ref('');

            const onChangeType = (newType) => {
                type.value = newType;
            }

            const isFetching = ref(false);

            const onSubmit = async () => {
                isFetching.value = true
                await store.dispatch('order/create', {
                    type: type.value,
                    comment: comment.value,
                })

                isFetching.value = false;
            }
            return {
                type,
                onChangeType,
                comment,
                onSubmit,
                isFetching
            }
        }
    }
</script>

<style lang="scss">

</style>
