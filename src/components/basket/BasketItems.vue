<template>
    <div class="basket-items">
        <div v-for="item in groupedItems" :key="item.id">
            <!-- Отображаем товар с его допами -->
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
            // Храним отсортированные и распределённые товары
            const groupedItems = computed(() => {
                const items = props.items;
                const result = [];

                items.forEach((item) => {
                    if (!item.extra_for_item) {
                        if (item.quantity > 1) {
                            // Разделяем товары с количеством > 1
                            for (let i = 1; i <= item.quantity; i++) {
                                const newItem = {...item, quantity: 1}; // Новый товар с quantity = 1
                                newItem.added_extras = []; // Допы для конкретного товара

                                // Перебираем все допы и добавляем их по индексу
                                items.forEach((extra) => {
                                    if (extra.extra_for_item === `${item.id}_${i}`) {
                                        newItem.added_extras.push(extra);
                                    }
                                });

                                // Добавляем новый товар в итоговый список
                                result.push(newItem);
                            }
                        } else {
                            // Если товар без quantity > 1, просто добавляем
                            item.added_extras = []; // Допы для товара
                            items.forEach((extra) => {
                                if (extra.extra_for_item === `${item.id}_1`) {
                                    item.added_extras.push(extra);
                                }
                            });
                            result.push(item);
                        }
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
