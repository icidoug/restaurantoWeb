<template>
    <f7-popup
              swipe-to-close="to-bottom"
              swipe-handler=".swipe-handler"
              class="popup-bottom order-type-popup"
    >
        <div class="swipe-handler">
            <div class="swipe-handler__icon"></div>
        </div>
        <div class="popup__wrapper">
            <div class="popup__header">
                Подать заказ
            </div>
            <div class="popup-form">
                <div class="popup-form__item"
                     :class="{active: selected === 'TABLE'}"
                     @click="selected = 'TABLE'"
                >
                    <div class="popup-form__item_title">
                        К столу
                    </div>
                    <div class="popup-form__item_checkbox"></div>
                </div>
                <div
                    class="popup-form__item"
                    :class="{active: selected === 'SELF'}"
                    @click="selected = 'SELF'"
                >
                    <div class="popup-form__item_title">
                        С собой
                    </div>
                    <div class="popup-form__item_checkbox"></div>
                </div>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    export default {
        data() {
            return {
                selected: 'TABLE'
            };
        },
        watch: {
            selected(val) {
                this.$emit('change', val);
            },
        },
    };
</script>

<style lang="scss">

</style>
