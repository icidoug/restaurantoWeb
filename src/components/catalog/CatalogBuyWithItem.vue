<template>
    <div class="buy-with-item">
        <div class="buy-with-item__image" @click="getDetail(item.id)">
            <div v-if="item.is_new" class="tag tag--green">Новинка</div>
            <img v-if="item.image" :src="item.image">
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16L22 16" stroke="white" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M4 19L20 19" stroke="white" stroke-width="1.5" stroke-linecap="round"></path>
                <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="white" stroke-width="1.5"></path>
                <path
                    d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 9.99999 3.89543 9.99999 5C9.99999 5.36429 10.0974 5.70583 10.2676 6"
                    stroke="white" stroke-width="1.5"></path>
            </svg>
        </div>
        <div class="buy-with-item__info">
            <div class="buy-with-item__title" @click="getDetail(item.id)">
                {{ item.name }}
            </div>
            <counter v-if="!partner.only_menu"
                     class="buy-with-item__btn"
                     :value="quantity"
                     @change="setQuantity($event)"
                     btn-style="border"
            >
                <span v-html="item.price_format"></span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M10 3.41666C10.4142 3.41666 10.75 3.75245 10.75 4.16666V9.25H15.8334C16.2476 9.25 16.5834 9.58578 16.5834 10C16.5834 10.4142 16.2476 10.75 15.8334 10.75H10.75V15.8333C10.75 16.2475 10.4142 16.5833 10 16.5833C9.58581 16.5833 9.25002 16.2475 9.25002 15.8333V10.75H4.16669C3.75247 10.75 3.41669 10.4142 3.41669 10C3.41669 9.58578 3.75247 9.25 4.16669 9.25H9.25002V4.16666C9.25002 3.75245 9.58581 3.41666 10 3.41666Z"
                          fill="#D2015F"/>
                </svg>
            </counter>
        </div>
    </div>
</template>

<script>
    import store from "@/store/store";
    import Counter from "@/components/Counter.vue";
    import {computed} from 'vue'

    export default {
        components: {Counter},
        props: {
            item: {
                type: Object,
                required: true
            },
        },
        setup(props) {
            const getDetail = (id) => {
                store.commit('catalog/setIsOpenModal', true);
                store.dispatch('catalog/getDetail', id);
            }

            const quantity = computed(() => {
                return store.getters['basket/getItemById'](props.item?.id)?.quantity || 0
            });

            const setQuantity = (qnt) => {
                if (quantity.value !== qnt) {
                    store.dispatch('basket/updateBasket', {
                        item: props.item,
                        quantity: qnt,
                    });
                }
            }

            const partner = computed(() => {
                return store.getters['partner/partner']
            });

            return {
                getDetail,
                quantity,
                setQuantity,
                partner
            }
        }
    }
</script>

<style lang="scss">

</style>
