<template>
    <div class="basket-item" :class="{'basket-item--extra': isExtra}">
        <div v-if="splitBill"
             class="basket-item__image"
             :class="{'active': item.is_checked && !item.is_paid}"
             @click="toggleChecked"
        >
            <div v-if="!item.is_paid && !isExtra" class="basket-item__checkbox"></div>
            <img v-if="item.image" :src="item.image" alt="">
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
        <div v-else class="basket-item__image">
            <img v-if="item.image" :src="item.image" alt="">
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
        <div class="basket-item__info">
            <div class="basket-item__title">
                {{ item.name }}
                <span v-if="splitBill && !isExtra" :class="{'basket-item__paid': item.is_paid}">
                    {{ item.is_paid ? $t('paid') : $t('not_paid') }}
                </span>
            </div>
            <div class="basket-item__price" v-html="item.price_format"></div>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import {computed} from "vue";

    export default {
        components: {},
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
            },
            isExtra: {
                type: Boolean,
                default: false
            },
        },
        setup(props) {
            const splitBill = computed(() => {
                return store.getters['order/splitBill']
            });

            const toggleChecked = () => {
                if(!props.item.is_paid) {
                    store.commit('order/setCheckedItemByBasketId', props.item.basket_id)
                }
            }

            return {
                splitBill,
                toggleChecked
            }
        }
    }
</script>

<style lang="scss">

</style>
