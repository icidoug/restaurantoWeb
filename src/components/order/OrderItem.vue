<template>
    <div class="basket-item">
        <div v-if="splitBill"
             class="basket-item__image"
             :class="{'active': item.is_checked && !item.is_paid}"
             @click="toggleChecked"
        >
            <div v-if="!item.is_paid" class="basket-item__checkbox"></div>
            <img v-if="item.image" :src="item.image" alt="">
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
