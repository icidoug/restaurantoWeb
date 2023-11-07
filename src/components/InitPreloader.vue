<template>
    <Vue3Lottie :animationData="isDarkMode ? PreloaderBlackJSON : PreloaderWhiteJSON" :height="300" :width="300" />
</template>

<script setup>
    import { Vue3Lottie } from 'vue3-lottie'
    import PreloaderWhiteJSON from '/src/assets/lottie/white.json'
    import PreloaderBlackJSON from '/src/assets/lottie/black.json'

    const props = defineProps({
        isDarkMode: Boolean,
    })
</script>

<style lang="scss">

</style>
