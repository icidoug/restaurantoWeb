<template>
    <div class="buy-with-item">
        <div class="buy-with-item__image" @click="getDetail(item.id)">
            <div v-if="item.is_new" class="tag tag--green">{{ $t('new') }}</div>
            <img v-if="item.image" :src="item.image">
            <svg v-else-if="item.type === 'drink'" width="24" height="24"  viewBox="-1.6 -1.6 35.20 35.20" fill="#000000">
                <path
                    d="M16,22c2.761,0,5-2.239,5-5s-2.239-5-5-5s-5,2.239-5,5S13.239,22,16,22z M16,13c2.206,0,4,1.794,4,4 c0,2.206-1.794,4-4,4s-4-1.794-4-4C12,14.794,13.794,13,16,13z M26,4l-0.772-2.316C25.092,1.275,24.71,1,24.279,1H7.721 C7.29,1,6.908,1.275,6.772,1.684L6,4C5.448,4,5,4.448,5,5v2c0,0.552,0.448,1,1,1h0.083l1.687,20.249C7.9,29.804,9.2,31,10.76,31 H21.24c1.56,0,2.86-1.196,2.99-2.751L25.917,8H26c0.552,0,1-0.448,1-1V5C27,4.448,26.552,4,26,4z M24.279,2l0.667,2H7.054l0.667-2 H24.279z M23.233,28.166C23.147,29.194,22.272,30,21.24,30H10.76c-1.032,0-1.907-0.806-1.993-1.834L7.087,8h17.826L23.233,28.166z M26,7H6V5h20V7z"/>
            </svg>
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
            <div class="item-detail__price" v-else>
                <span v-html="item.price_format"></span>
            </div>
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
            parentItem: {
                type: Object,
                required: true
            },
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
        },
        setup(props) {
            const extra_for_item =  props.parentItem.id + '_' + props.index
            const getDetail = (id) => {
                store.commit('catalog/setIsOpenModal', true);
                store.dispatch('catalog/getDetail', id);
            }

            const quantity = computed(() => {
                return store.getters['basket/getExtraItemById'](props.item?.id, extra_for_item)?.quantity || 0
            });

            const setQuantity = (qnt) => {
                if (quantity.value !== qnt) {
                    store.dispatch('basket/updateBasket', {
                        item: props.item,
                        quantity: qnt,
                        extra_for_item,
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
