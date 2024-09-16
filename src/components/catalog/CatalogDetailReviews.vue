<template>
    <div class="item-detail-review">
        <div class="item-detail-review__rating">
            <div class="rating-item rating-item--badly"
                 :class="{active: reviewRating === 'badly'}"
                 @click="reviewRating = 'badly'"
            >
                <img src="/src/assets/images/emoji/badly.png">
                <span>{{ $t('bad') }}</span>
            </div>
            <div class="rating-item rating-item--fine"
                 :class="{active: reviewRating === 'fine'}"
                 @click="reviewRating = 'fine'"
            >
                <img src="/src/assets/images/emoji/fine.png">
                <span>{{ $t('normal') }}</span>
            </div>
            <div class="rating-item rating-item--great"
                 :class="{active: reviewRating === 'great'}"
                 @click="reviewRating = 'great'"
            >
                <img src="/src/assets/images/emoji/great.png">
                <span>{{ $t('great') }}</span>
            </div>
        </div>
        <div class="item-detail-review__textarea">
            <textarea v-model="review" :placeholder="$t('write_review_placeholder')"></textarea>
            <div class="item-detail-review__prompt">
                {{ $t('leave_your_phone') }}
            </div>
        </div>
        <div class="item-detail-review__btn btn btn--border" @click="sendReview">
            {{ $t('post_review') }}
        </div>
        <transition>
            <div v-if="isSent" class="review-success">
                <div class="review-success__icon">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M2.41675 15C2.41675 8.05041 8.0505 2.41666 15.0001 2.41666C21.9497 2.41666 27.5834 8.05041 27.5834 15C27.5834 21.9496 21.9497 27.5833 15.0001 27.5833C13.5556 27.5833 12.3396 27.3782 11.2211 26.9781L11.0783 26.927L11.0781 26.9269C10.0586 26.5622 9.46722 26.3506 9.20581 26.2891L9.04341 26.9796L9.2058 26.2891C7.96718 25.9978 7.07004 26.2909 6.30344 26.6552C6.10679 26.7487 5.92923 26.8394 5.76197 26.925C5.26158 27.1808 4.8535 27.3894 4.30302 27.4811C3.92819 27.5436 3.59468 27.2367 3.62578 26.858C3.64542 26.619 3.74187 26.353 3.90395 25.9945C3.93051 25.9357 3.95972 25.8728 3.99047 25.8066L3.99055 25.8064C4.12639 25.5139 4.29237 25.1565 4.39363 24.8041C4.88709 23.087 4.25626 21.7375 3.68278 20.5107C3.6468 20.4337 3.61104 20.3572 3.5758 20.2811C2.83227 18.6761 2.41675 16.8875 2.41675 15ZM15.0001 0.916656C7.22207 0.916656 0.916748 7.22198 0.916748 15C0.916748 17.1098 1.38162 19.1132 2.21475 20.9116L2.2653 21.0207C2.88513 22.3573 3.28701 23.224 2.95198 24.3898L3.45209 24.5335L2.95198 24.3898C2.88594 24.6196 2.78342 24.8415 2.65343 25.1229L2.65342 25.1229C2.61677 25.2022 2.57794 25.2863 2.53712 25.3766C2.36972 25.7469 2.17335 26.2173 2.13082 26.7352C2.01973 28.0878 3.21086 29.1838 4.54953 28.9607L4.42628 28.2209L4.54954 28.9607C5.35324 28.8268 6.03099 28.4775 6.56501 28.2023L6.56504 28.2023L6.56506 28.2023C6.70202 28.1317 6.82953 28.066 6.94729 28.01C7.54255 27.7271 8.07715 27.5646 8.86241 27.7493C9.02771 27.7882 9.53671 27.9686 10.7158 28.3904L10.9684 27.6842L10.7158 28.3904C12.0167 28.8558 13.4063 29.0833 15.0001 29.0833C22.7781 29.0833 29.0834 22.778 29.0834 15C29.0834 7.22198 22.7781 0.916656 15.0001 0.916656ZM20.1971 12.197C20.49 11.9041 20.49 11.4292 20.1971 11.1363C19.9042 10.8434 19.4293 10.8434 19.1364 11.1363L13.6667 16.606L11.5304 14.4697C11.2375 14.1768 10.7626 14.1768 10.4698 14.4697C10.1769 14.7626 10.1769 15.2374 10.4698 15.5303L13.1364 18.197C13.4293 18.4899 13.9042 18.4899 14.1971 18.197L20.1971 12.197Z"
                              fill="#00C600"/>
                    </svg>
                </div>
                <div class="review-success__info">
                    <div class="review-success__title">
                        {{ $t('thanks_for_feedback') }}
                    </div>
                    <div class="review-success__descr">
                        {{ $t('we_make_satisfied') }}
                    </div>
                </div>
            </div>
        </transition>
        <div class="review-services">
            <div class="review-services__text">
                {{ $t('review_in_other_services') }}
            </div>
            <div class="review-services__items">
                <f7-link external v-if="partner.services['yandex']" :href="partner.services['yandex']"
                         target="_blank"
                         class="review-services__item"
                >
                    <img v-if="partner.dark_theme" src="/src/assets/images/services/yandex_dark.png" alt="">
                    <img v-else src="/src/assets/images/services/yandex.png" alt="">
                </f7-link>
                <f7-link external v-if="partner.services['2gis']" :href="partner.services['2gis']"
                         target="_blank"
                         class="review-services__item"
                >
                    <img v-if="partner.dark_theme" src="/src/assets/images/services/2gis_dark.png" alt="">
                    <img v-else src="/src/assets/images/services/2gis.png" alt="">
                </f7-link>
                <f7-link external v-if="partner.services['tripadvisor']" :href="partner.services['tripadvisor']"
                         target="_blank"
                         class="review-services__item"
                >
                    <img v-if="partner.dark_theme" src="/src/assets/images/services/tripadvisor_dark.png" alt="">
                    <img v-else src="/src/assets/images/services/tripadvisor.png" alt="">
                </f7-link>
                <f7-link external v-if="partner.services['yelp']" :href="partner.services['yelp']"
                         target="_blank"
                         class="review-services__item"
                >
                    <img v-if="partner.dark_theme" src="/src/assets/images/services/yelp_dark.png" alt="">
                    <img v-else src="/src/assets/images/services/yelp.png" alt="">
                </f7-link>
                <f7-link external v-if="partner.services['google']" :href="partner.services['google']"
                         target="_blank"
                         class="review-services__item"
                >
                    <img v-if="partner.dark_theme" src="/src/assets/images/services/google_dark.png" alt="">
                    <img v-else src="/src/assets/images/services/google.png" alt="">
                </f7-link>
            </div>
        </div>
        <div v-if="reviews.length > 0" class="item-detail-review__items">
            <div class="item-detail__line"></div>
            <div class="item-detail__subtitle">
                {{ $t('guest_reviews') }}
            </div>
            <div v-for="review in reviews" class="review-item">
                <div class="review-item__icon">
                    <img :src="`/src/assets/images/emoji/${review.rating_code}.png`" alt="">
                </div>
                <div class="review-item__info">
                    <div class="review-item__header">
                        <div class="review-item__title">
                            {{ review.rating_title }}
                        </div>
                        <div class="review-item__date">
                            {{ review.date }}
                        </div>
                    </div>
                    <div class="review-item__text" v-html="review.text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {computed, ref} from 'vue'
    import store from '@/store/store'

    export default {
        components: {},
        props: {
            id: {
                required: true
            },
            reviews: {
                type: Array,
                required: true
            },
        },
        setup(props) {
            const review = ref('');
            const reviewRating = ref('great');
            const isSent = ref(false);
            const sendReview = () => {
                isSent.value = true;
                store.dispatch('catalog/sendReview', {
                    id: props.id,
                    review: review.value,
                    ratingCode: reviewRating.value,
                });
                review.value = '';
                setTimeout(() => isSent.value = false, 5000);
            }
            const partner = computed(() => {
                return store.getters['partner/partner']
            });
            return {
                review,
                reviewRating,
                sendReview,
                isSent,
                partner
            }
        }
    }
</script>

<style lang="scss">

</style>
