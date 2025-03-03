<template>
    <div class="basket-items">
        <div v-for="item in groupedItems" :key="item.id">
            <basket-item :item="item"/>
            <div v-if="item.added_extras && item.added_extras.length > 0">
                <div v-for="extraItem in item.added_extras">
                    <basket-item v-for="i in extraItem.quantity" :item="extraItem" isExtra/>
                </div>
            </div>
        </div>

        <div class="basket-items__footer">
            <div class="basket-items__footer_title">
                {{ $t('order_price') }}:
            </div>
            <div class="basket-items__footer_price">
                {{ $formatCurrency(sum) }}
            </div>
        </div>
    </div>
</template>

<script>
    import store from "@/store/store";
    import BasketItem from "@/components/basket/BasketItem.vue";
    import {computed, ref, watchEffect} from "vue";

    export default {
        components: {
            BasketItem,
        },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        setup(props) {
            const groupedItems = computed(() => {
                const items = props.items;
                const result = [];

                items.forEach((item) => {
                    if (!item.extra_for_item) {
                        item.added_extras = [];
                        items.forEach((extra) => {
                            if (extra.extra_for_item === `${item.basket_id}`) {
                                item.added_extras.push(extra);
                            }
                        });
                        result.push(item);
                    }
                });

                return result;
            });

            // Рассчитываем общую сумму
            const sum = computed(() => {
                return store.getters["basket/sum"];
            });

            return {
                sum,
                groupedItems,
            };
        },
    };
</script>

<style lang="scss">
/* Ваши стили */
</style>
