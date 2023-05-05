<template>
   <div class="item-detail-review">
       <div class="item-detail-review__rating">
           <div class="rating-item">
               <img src="/src/assets/images/emoji/sad.png">
               <span>Плохо</span>
           </div>
           <div class="rating-item">
               <img src="/src/assets/images/emoji/smile.png">
               <span>Нормально</span>
           </div>
           <div class="rating-item">
               <img src="/src/assets/images/emoji/heart_eyes.png">
               <span>Отлично</span>
           </div>
       </div>
   </div>
</template>

<script>
    import {ref, computed} from 'vue'
    import store from '@/store/store'

    export default {
        components: {},
        setup() {

            return {

            }
        }
    }
</script>

<style lang="scss">

</style>
