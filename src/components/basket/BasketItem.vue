<template>
    <div class="basket-item">
        <div class="basket-item__image">
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
        <div class="basket-item__info">
            <div class="basket-item__title">
                {{ item.name }}
            </div>
            <div class="basket-item__price" v-html="item.price_format"></div>
            <div class="basket-item__delete" @click="deleteItem">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16675 5.83334H15.8334" stroke="#C8C8C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15 5.83333V14.1667C15 15.5474 13.8807 16.6667 12.5 16.6667H7.5C6.11929 16.6667 5 15.5474 5 14.1667V5.83333" stroke="#C8C8C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12.5 3.12499H7.5" stroke="#C8C8C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8.33341 9.16667V13.3333" stroke="#C8C8C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.6667 9.16667V13.3333" stroke="#C8C8C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '@/store/store'

    export default {
        components: {

        },
        props: {
            item: {
                type: Object,
                required: true
            },
        },
        setup(props) {
            const deleteItem = () => {
                store.dispatch('basket/updateBasket', {
                    item: props.item,
                    quantity: props.item.quantity - 1,
                });
            }
            return {
                deleteItem
            }
        }
    }
</script>

<style lang="scss">

</style>
