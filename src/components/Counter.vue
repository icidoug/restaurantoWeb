<template>
    <div class="counter">
        <div
            v-if="count === 0"
            class="btn"
            :class="{'btn--border': btnStyle === 'border', 'btn--pink': btnStyle === 'fill'}"
            @click="handleAddClick"
        >
            <slot></slot>
        </div>
        <div
            v-else
            class="btn"
            :class="{'btn--border': btnStyle === 'fill', 'btn--pink': btnStyle === 'border'}"
        >
            <div class="counter__minus" @click="decreaseCount">
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.416687 1C0.416687 0.585786 0.752473 0.25 1.16669 0.25H7.00002H12.8334C13.2476 0.25 13.5834 0.585786 13.5834 1C13.5834 1.41421 13.2476 1.75 12.8334 1.75H7.00002H1.16669C0.752473 1.75 0.416687 1.41421 0.416687 1Z" fill="white"/>
                </svg>
            </div>
            <span>{{ count }}</span>
            <div class="counter__plus" @click="increaseCount">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-fill">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 3.41667C10.4142 3.41667 10.75 3.75246 10.75 4.16667V9.25H15.8334C16.2476 9.25 16.5834 9.58579 16.5834 10C16.5834 10.4142 16.2476 10.75 15.8334 10.75H10.75V15.8333C10.75 16.2476 10.4142 16.5833 10 16.5833C9.58581 16.5833 9.25002 16.2476 9.25002 15.8333V10.75H4.16669C3.75247 10.75 3.41669 10.4142 3.41669 10C3.41669 9.58579 3.75247 9.25 4.16669 9.25H9.25002V4.16667C9.25002 3.75246 9.58581 3.41667 10 3.41667Z" fill="white"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: Number,
                required: true,
            },
            btnStyle: {
                type: String,
                default: 'border'
            },
            hasExtras: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                count: 0
            };
        },
        watch: {
            count(val) {
                this.$emit('change', val);
            },
            value(val) {
                this.count = val;
            },
        },
        mounted() {
            this.count = this.value;
        },
        methods: {
            handleAddClick() {
                if (this.hasExtras) {
                    console.log('openExtrasPopup')
                    this.$emit('openExtrasPopup');
                } else {
                    this.count++;
                }
            },
            increaseCount() {
                if (this.hasExtras) {
                    this.$emit('openExtrasPopup');
                } else {
                    this.count++;
                }
            },
            decreaseCount() {
                if (this.count > 0) {
                    this.count--;
                }
            }
        }
    };
</script>

<style lang="scss">
</style>