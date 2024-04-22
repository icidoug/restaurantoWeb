<template>
    <div class="basket-items">
        <div v-if="paidItems.length === 0" class="basket-items__header">
            <f7-toggle :checked="splitBill" @change="splitToggle($event.target.checked)"></f7-toggle>
            <span>{{ $t('split_bill') }}</span>
        </div>
        <div class="basket-items__wrapper">
            <order-item v-for="(item, i) in items" :index="i" :item="item"/>
        </div>
        <div v-if="splitBill" class="btn btn--border" @click="shareBill">
            <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0304 0.46967C11.7375 0.176777 11.2626 0.176777 10.9697 0.46967L6.96971 4.46967C6.67682 4.76256 6.67682 5.23744 6.96971 5.53033C7.26261 5.82322 7.73748 5.82322 8.03037 5.53033L10.75 2.81066V14C10.75 14.4142 11.0858 14.75 11.5 14.75C11.9143 14.75 12.25 14.4142 12.25 14V2.81066L14.9697 5.53033C15.2626 5.82322 15.7375 5.82322 16.0304 5.53033C16.3233 5.23744 16.3233 4.76256 16.0304 4.46967L12.0304 0.46967ZM7.00004 8.25L6.85703 8.24998C5.59892 8.2497 4.79702 8.24952 4.12119 8.45453C2.60308 8.91505 1.41509 10.103 0.954575 11.6211C0.749563 12.297 0.749741 13.0989 0.75002 14.357L0.750041 14.5V15L0.750041 15.0274C0.750037 15.9361 0.750034 16.6562 0.789841 17.2397C0.830507 17.8357 0.91521 18.3436 1.11161 18.8177C1.59371 19.9816 2.51841 20.9063 3.68229 21.3884C4.15645 21.5848 4.66435 21.6695 5.26037 21.7102C5.8438 21.75 6.56397 21.75 7.47266 21.75H7.47272H7.50004H15.5H15.5275H15.5275C16.4362 21.75 17.1563 21.75 17.7397 21.7102C18.3357 21.6695 18.8436 21.5848 19.3178 21.3884C20.4817 20.9063 21.4064 19.9816 21.8885 18.8177C22.0849 18.3436 22.1696 17.8357 22.2102 17.2397C22.25 16.6563 22.25 15.9361 22.25 15.0274V15.0274V15V14.5L22.2501 14.357C22.2503 13.0989 22.2505 12.297 22.0455 11.6211C21.585 10.103 20.397 8.91505 18.8789 8.45453C18.2031 8.24952 17.4012 8.2497 16.143 8.24998L16 8.25H15.5C15.0858 8.25 14.75 8.58579 14.75 9C14.75 9.41421 15.0858 9.75 15.5 9.75H16C17.4502 9.75 18.009 9.75814 18.4435 9.88994C19.4822 10.205 20.295 11.0179 20.6101 12.0566C20.7419 12.4911 20.75 13.0499 20.75 14.5V15C20.75 15.9421 20.7496 16.6112 20.7137 17.1376C20.6783 17.6572 20.6107 17.9828 20.5027 18.2437C20.1728 19.0401 19.5401 19.6728 18.7438 20.0026C18.4828 20.1107 18.1573 20.1782 17.6376 20.2137C17.1112 20.2496 16.4422 20.25 15.5 20.25H7.50004C6.5579 20.25 5.88885 20.2496 5.36247 20.2137C4.84283 20.1782 4.51724 20.1107 4.25632 20.0026C3.45998 19.6728 2.82729 19.0401 2.49743 18.2437C2.38935 17.9828 2.32182 17.6572 2.28636 17.1376C2.25045 16.6112 2.25004 15.9421 2.25004 15V14.5C2.25004 13.0499 2.25818 12.4911 2.38999 12.0566C2.70507 11.0179 3.51791 10.205 4.55662 9.88994C4.99111 9.75814 5.54991 9.75 7.00004 9.75H7.50004C7.91425 9.75 8.25004 9.41421 8.25004 9C8.25004 8.58579 7.91425 8.25 7.50004 8.25H7.00004Z" fill="#D2015F"/>
            </svg>
            <span>{{ $t('share_bill') }}</span>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'
    import {computed, onMounted} from 'vue';
    import OrderItem from "@/components/order/OrderItem.vue";
    import {f7} from "framework7-vue";
    import Cookies from "js-cookie";

    export default {
        components: {
            OrderItem,
        },
        props: {
            items: {
                type: Array,
                required: true
            },
        },
        setup() {
            const sum = computed(() => {
                return store.getters['order/sum']
            });

            const splitBill = computed(() => {
                return store.getters['order/splitBill']
            });

            const paidItems = computed(() => {
                return store.getters['order/paidItems']
            });

            const splitToggle = (val) => {
                store.commit('order/setSplitBill', val)
            }

            const url = computed(() => {
                return document.location.origin + '/?table=' + Cookies.get('table') + '&zone=' + Cookies.get('zone') + '&partner=' + Cookies.get('partner') + '&items=' + store.getters['order/checkedItems'].map(item => item.basket_id);
            });

            const shareBill = () => {
                try {
                    navigator.share({
                        url: url.value,
                        title: "",
                        text: ""
                    });
                } catch (e) {
                    f7.popup.open('.share-popup');
                }

            }

            return {
                sum,
                splitToggle,
                splitBill,
                paidItems,
                shareBill
            }
        }
    }
</script>

<style lang="scss">

</style>
