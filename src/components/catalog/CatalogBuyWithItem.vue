<template>
    <div class="buy-with-item">
        <div class="buy-with-item__image" @click="getDetail(item.id)">
            <div v-if="is_new" class="tag tag--green">Новинка</div>
            <img v-if="item.image" :src="item.image">
        </div>
        <div class="buy-with-item__info">
            <div class="buy-with-item__title" @click="getDetail(item.id)">
                {{ item.name }}
            </div>
            <div class="buy-with-item__btn">
                <counter :count="0" :price="item.price_format"/>
            </div>
        </div>
    </div>
</template>

<script>

    import store from "@/store/store";
    import Counter from "@/components/Counter.vue";

    export default {
        components: {Counter},
        props: {
            item: {
                type: Object,
                required: true
            },
        },
        setup() {
            const getDetail = (id) => {
                store.dispatch('catalog/getDetail', id);
            }
            return {
                getDetail
            }
        }
    }
</script>

<style lang="scss">

</style>
