<template>
    <f7-popup
        class="popup-bottom hookah-confirm-popup"
        :close-by-backdrop-click="false"
        :close-on-escape="false"
    >
        <f7-link popup-close class="waiter-popup__close">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L10 8.93934L14.4697 4.46967C14.7626 4.17678 15.2374 4.17678 15.5303 4.46967C15.8232 4.76256 15.8232 5.23744 15.5303 5.53033L11.0607 10L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7626 15.8232 14.4697 15.5303L10 11.0607L5.53033 15.5303C5.23744 15.8232 4.76256 15.8232 4.46967 15.5303C4.17678 15.2374 4.17678 14.7626 4.46967 14.4697L8.93934 10L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z"
                      fill="#898989"/>
            </svg>
        </f7-link>
        <div class="popup__wrapper">
            <div v-if="isLoading" class="waiter-confirm-loading">
                <preloader/>
            </div>
            <div v-else-if="isError" class="waiter-confirm">
                <div class="waiter-confirm__icon error">
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.792893 0.292893C1.18342 -0.0976311 1.81658 -0.0976311 2.20711 0.292893L9.5 7.58579L16.7929 0.292893C17.1834 -0.0976311 17.8166 -0.0976311 18.2071 0.292893C18.5976 0.683417 18.5976 1.31658 18.2071 1.70711L10.9142 9L18.2071 16.2929C18.5976 16.6834 18.5976 17.3166 18.2071 17.7071C17.8166 18.0976 17.1834 18.0976 16.7929 17.7071L9.5 10.4142L2.20711 17.7071C1.81658 18.0976 1.18342 18.0976 0.792893 17.7071C0.402369 17.3166 0.402369 16.6834 0.792893 16.2929L8.08579 9L0.792893 1.70711C0.402369 1.31658 0.402369 0.683417 0.792893 0.292893Z" fill="white"/>
                    </svg>
                </div>
                <div class="waiter-confirm__title">
                    Что-то пошло не так...
                </div>
                <div class="waiter-confirm__descr">
                    Пожалуйста, попробуйте еще раз
                </div>
                <div class="btn btn--border" @click="repeat">Повторить попытку</div>
            </div>
            <div v-else class="waiter-confirm">
                <div class="waiter-confirm__icon">
                    <svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M23.8424 0.262852C24.2495 0.636044 24.277 1.26861 23.9038 1.67573L9.23713 17.6757C9.05283 17.8768 8.79439 17.9938 8.5217 17.9998C8.24901 18.0057 7.98574 17.9 7.79287 17.7071L1.12621 11.0404C0.735682 10.6499 0.735682 10.0168 1.12621 9.62623C1.51673 9.23571 2.1499 9.23571 2.54042 9.62623L8.46857 15.5544L22.4295 0.324281C22.8027 -0.0828378 23.4353 -0.110341 23.8424 0.262852Z"
                              fill="white"/>
                    </svg>
                </div>
                <div class="waiter-confirm__title">
                    Кальянщик скоро к вам подойдет
                </div>
                <div class="waiter-confirm__descr">
                    Следующий вызов можно будет сделать через {{ timerString }}
                </div>
            </div>
        </div>
    </f7-popup>
</template>

<script>
    import Preloader from "@/components/Preloader.vue";
    import {ref, watch} from 'vue'
    import {f7} from 'framework7-vue';

    export default {
        components: {
            Preloader
        },
        props: {
            isLoading: {
                type: Boolean,
                required: true,
                default: true,
            },
            isError: {
                type: Boolean,
                required: true,
                default: true,
            },
            minutesDifference: {
                type: Number,
                required: true,
                default: 0,
            },
        },
        setup(props) {
            const timerString = ref('02:00');
            const intervalId = ref(null);

            const startTimer = (duration) => {
                let timer = duration;
                intervalId.value = setInterval(function () {
                    timerString.value = getTimeString(timer);

                    if (--timer < 0) {
                        clearInterval(intervalId.value);
                    }
                }, 1000);
            }

            const getTimeString = (duration) => {
                let minutes, seconds;

                minutes = parseInt(duration / 60, 10);
                seconds = parseInt(duration % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                return minutes + ":" + seconds;
            }

            if (props.minutesDifference > 0) {
                startTimer(props.minutesDifference - 1 || 0);
            }

            watch(() => props.minutesDifference, (newMinutesDifference) => {
                clearInterval(intervalId.value);
                timerString.value = getTimeString(newMinutesDifference);
                startTimer(newMinutesDifference - 1);
            });

            const repeat = () => {
                f7.popup.close('.hookah-confirm-popup');
                f7.popup.open('.waiter-popup');
            }

            return {
                timerString,
                repeat
            }
        },
    };
</script>

<style lang="scss">

</style>
