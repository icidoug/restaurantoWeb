<template>
    <div class="basket-item">
        <div v-if="splitBill"
             class="basket-item__image"
             :class="{'active': item.is_checked && !item.is_paid}"
             @click="toggleChecked"
        >
            <div v-if="!item.is_paid" class="basket-item__checkbox"></div>
            <img v-if="item.image" :src="item.image" alt="">
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
        </div>
        <div class="basket-item__info">
            <div class="basket-item__title">
                {{ item.name }}
                <span v-if="splitBill" :class="{'basket-item__paid': item.is_paid}">
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
                required: true
            },
        },
        setup(props) {
            const splitBill = computed(() => {
                return store.getters['order/splitBill']
            });

            const toggleChecked = () => {
                if(!props.item.is_paid) {
                    store.commit('order/setCheckedItem', props.index)
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
