<template>
    <div class="catalog-items">
        <div class="catalog-items__title">
            Завтраки
        </div>
        <div class="catalog-items__wrapper">
            <div v-for="i in 10" class="item-card">
                <div class="item-card__image">
                    <img src="/src/assets/images/emoji/catalog-card.png">
                </div>
                <div class="item-card__info">
                    <div class="item-card__price">
                        499₽
                    </div>
                    <div class="item-card__weight">
                        310г
                    </div>
                </div>
                <div class="item-card__title">
                    Омлет с тигровыми креветками и моцареллой
                </div>
                <div class="btn btn--border">
                    <span>В заказ</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0.416656C7.41421 0.416656 7.75 0.752443 7.75 1.16666V6.24999H12.8333C13.2475 6.24999 13.5833 6.58578 13.5833 6.99999C13.5833 7.4142 13.2475 7.74999 12.8333 7.74999H7.75V12.8333C7.75 13.2475 7.41421 13.5833 7 13.5833C6.58578 13.5833 6.25 13.2475 6.25 12.8333V7.74999H1.16666C0.752451 7.74999 0.416664 7.4142 0.416664 6.99999C0.416664 6.58578 0.752451 6.24999 1.16666 6.24999H6.25V1.16666C6.25 0.752443 6.58578 0.416656 7 0.416656Z" fill="#D2015F"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        setup() {

            return {
            }
        }
    }
</script>

<style lang="scss">

</style>
