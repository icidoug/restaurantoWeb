<template>
    <div class="waiter padding-side">
        <div class="waiter__wrapper">
            <div class="waiter__info">
                <div class="waiter__avatar">
                    <img v-if="waiter.image" :src="waiter.image">
                </div>
                <div class="waiter__title">
                    <div class="waiter__title_name">
                        {{ waiter.name }}
                    </div>
                    <div class="waiter__subtitle">
                        {{ $t('your_waiter') }}
                    </div>
                </div>
            </div>
            <div class="waiter__rating">
                <img v-if="parseFloat(waiter.rating) > 4" src="/src/assets/images/emoji/heart_eyes.png">
                <img v-else-if="parseFloat(waiter.rating) > 3" src="/src/assets/images/emoji/smile.png">
                <img v-else src="/src/assets/images/emoji/sad.png">
                <span>{{ waiter.rating }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        props: {
            waiter: {
                type: Object,
                required: true
            },
        },
        setup() {

            return {}
        }
    }
</script>

<style lang="scss">

</style>
