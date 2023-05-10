<template>
    <div class="basket-item">
        <div class="basket-item__image">
            <img src="/src/assets/images/buy-with.png" alt="">
        </div>
        <div class="basket-item__info">
            <div class="basket-item__title">
                Омлет с тигровыми креветками и моцареллой
            </div>
            <div class="basket-item__price">
                499₽
            </div>
            <div class="basket-item__delete">
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

            return {

            }
        }
    }
</script>

<style lang="scss">

</style>
