<template>
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
    >
        <div v-if="show" class="height-transition">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'HeightTransition',
        props: {
            show: {
                type: Boolean,
                required: true,
            },
        },
        setup(props) {
            const beforeEnter = (el) => {
                el.style.height = '0';
                el.style.opacity = '0';
            };

            const enter = (el, done) => {
                const height = el.scrollHeight;
                el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
                el.style.height = `${height}px`;
                el.style.opacity = '1';
                el.addEventListener('transitionend', done);
            };

            const leave = (el, done) => {
                el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
                el.style.height = '0';
                el.style.opacity = '0';
                el.addEventListener('transitionend', done);
            };

            return {
                beforeEnter,
                enter,
                leave,
            };
        },
    };
</script>

<style scoped>
.height-transition {
    overflow: hidden;
}
</style>
