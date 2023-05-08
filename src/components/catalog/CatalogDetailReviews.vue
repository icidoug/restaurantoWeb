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
       <div class="item-detail-review__textarea">
           <textarea placeholder="Напишите отзыв"></textarea>
           <div class="item-detail-review__prompt">
               Оставьте номер телефона, если хотите, чтобы с вами связались
           </div>
       </div>
       <div class="item-detail-review__btn btn btn--border">
           Отправить отзыв
       </div>
       <div class="review-services">
           <div class="review-services__text">
               Также вы можете оставить отзыв в других сервисах
           </div>
           <div class="review-services__items">
               <div class="review-services__item">
                   <img src="/src/assets/images/services/yandex.png" alt="">
               </div>
               <div class="review-services__item">
                   <img src="/src/assets/images/services/2gis.png" alt="">
               </div>
               <div class="review-services__item">
                   <img src="/src/assets/images/services/tripadvisor.png" alt="">
               </div>
           </div>
       </div>
       <div class="item-detail__line"></div>
       <div class="item-detail__subtitle">
           Отзывы гостей
       </div>
        <div class="item-detail-review__items">
            <div v-for="i in 10" class="review-item">
                <div class="review-item__icon">
                    <img src="/src/assets/images/emoji/heart_eyes.png" alt="">
                </div>
                <div class="review-item__info">
                    <div class="review-item__header">
                        <div class="review-item__title">
                            Отлично!
                        </div>
                        <div class="review-item__date">
                            27.03.2023
                        </div>
                    </div>
                    <div class="review-item__text">
                        Шикарный, божественный, бесподобный бутер для завтрака, обеда и ужина!!! Рекомендую!
                    </div>
                </div>
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
