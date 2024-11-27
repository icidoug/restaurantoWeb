<template>
    <div class="item-card"
         :class="{temp: item.temporarily_unavailable}"
    >
        <div class="item-card__image" @click="getDetail">
            <img v-if="item.image && item.image !== ''" :src="item.image">
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
        <div class="item-card__info">
            <div class="item-card__price" v-html="item.price_format"></div>
            <div v-if="item.weight" class="item-card__weight">
                {{ item.weight + $t('weight_value') }}
            </div>
        </div>
        <div class="item-card__title" @click="getDetail">
            {{ item.name }}
        </div>
        <div v-if="item.temporarily_unavailable" class="btn btn--disabled">{{ $t('temporarily_unavailable') }}</div>
        <counter v-else-if="!partner.only_menu"
                 class="item-card____btn"
                 :value="quantity"
                 @change="setQuantity($event)"
                 btn-style="border"
        >
            <span>{{ $t('to_order') }}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7 0.416656C7.41421 0.416656 7.75 0.752443 7.75 1.16666V6.24999H12.8333C13.2475 6.24999 13.5833 6.58578 13.5833 6.99999C13.5833 7.4142 13.2475 7.74999 12.8333 7.74999H7.75V12.8333C7.75 13.2475 7.41421 13.5833 7 13.5833C6.58578 13.5833 6.25 13.2475 6.25 12.8333V7.74999H1.16666C0.752451 7.74999 0.416664 7.4142 0.416664 6.99999C0.416664 6.58578 0.752451 6.24999 1.16666 6.24999H6.25V1.16666C6.25 0.752443 6.58578 0.416656 7 0.416656Z"
                      fill="#D2015F"/>
            </svg>
        </counter>
    </div>
</template>

<script>
    import store from '@/store/store'
    import Counter from "@/components/Counter.vue";
    import {computed} from "vue";
    import {f7} from "framework7-vue";

    export default {
        components: {
            Counter

        },
        props: {
            item: {
                type: Object,
                required: true
            },
        },
        setup(props) {
            const getDetail = () => {
                if (props.item.temporarily_unavailable) {
                    return;
                }
                store.commit('catalog/setIsOpenModal', true);
                store.dispatch('catalog/getDetail', props.item.id);
            }

            const quantity = computed(() => {
                return store.getters['basket/getItemById'](props.item?.id)?.quantity || 0
            });

            const setQuantity = (qnt) => {
                /*f7.notification.create({
                    icon: '<i class="icon icon-f7"></i>',
                    title: 'Framework7',
                    titleRightText: 'now',
                    subtitle: 'This is a subtitle',
                    text: 'This is a simple notification message',
                    closeTimeout: 3000,
                }).open();*/

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
