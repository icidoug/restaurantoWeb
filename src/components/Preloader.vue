<template>
    <div class="preloader-icon">
<!--        <img src="/src/assets/images/preloader.png" alt="">-->
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop class="preloader-icon-stop-start" offset="0%" style="stop-color:var(--pink); stop-opacity:1" />
                    <stop class="preloader-icon-stop-end" offset="100%" style="stop-opacity:0" />
                </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" stroke="url(#gradient)" stroke-width="10" fill="none" stroke-dasharray="283" stroke-dashoffset="80" stroke-linecap="round"></circle>
        </svg>

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
