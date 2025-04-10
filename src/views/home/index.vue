<template>
    <f7-page id="home">
        <div class="home">
            <div class="home__header padding-side">
                <div class="home__header_wrapper">
                    <div class="home__header_title">
                        {{ partner?.name }}
                        <div v-if="partner.logo" class="home__header_logo">
                            <img :src="partner.logo" alt="">
                        </div>
                    </div>
                    <div
                        v-if="partner.hasOwnProperty('address')"
                        class="home__header_geo"
                    >
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M0.5 7C0.5 3.35359 3.42896 0.833328 7 0.833328C10.571 0.833328 13.5 3.35359 13.5 7C13.5 9.78058 12.2563 11.822 10.8438 13.1593C10.1394 13.8262 9.38961 14.3219 8.72205 14.6527C8.07103 14.9754 7.44715 15.1665 7 15.1665C6.55285 15.1665 5.92897 14.9754 5.27795 14.6527C4.61039 14.3219 3.86063 13.8262 3.15625 13.1593C1.74373 11.822 0.5 9.78058 0.5 7ZM7 9.33333C8.10457 9.33333 9 8.4379 9 7.33333C9 6.22876 8.10457 5.33333 7 5.33333C5.89543 5.33333 5 6.22876 5 7.33333C5 8.4379 5.89543 9.33333 7 9.33333Z"
                                  fill="#D2015F"/>
                        </svg>
                        <span>
                            {{ partner.address }}
                        </span>
                    </div>
                </div>
                <!--                <f7-toggle></f7-toggle>-->
            </div>
            <your-waiter v-if="waiter.id" :waiter="waiter"/>
            <div v-if="!partner.hide_call_waiter" class="home__waiter padding-side">
                <f7-button class="btn btn--pink btn--arrow" @click="openWaiterPopup" popup-open=".waiter-popup">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 16L22 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M4 19L20 19" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="white"
                              stroke-width="1.5"/>
                        <path
                            d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 5.36429 10.0974 5.70583 10.2676 6"
                            stroke="white" stroke-width="1.5"/>
                    </svg>
                    <span>{{ $t('call_waiter') }}</span>
                </f7-button>
            </div>
            <div class="home-menu">
                <f7-link v-if="orderItems.length > 0 && !isOrderPaid && !partner.only_menu" href="/order/"
                         class="home-menu__item">
                    <div class="home-menu__item_icon">
                        <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M6.04493 4.93058C3.76346 5.53995 2.08318 7.6221 2.08318 10.0952V18.6667C2.08318 20.5459 2.08376 21.9102 2.17151 22.9842C2.25855 24.0495 2.42759 24.7631 2.72805 25.3528C3.2953 26.4661 4.20044 27.3712 5.31373 27.9385C5.90342 28.2389 6.61696 28.408 7.68226 28.495C8.75632 28.5827 10.1206 28.5833 11.9998 28.5833C13.8791 28.5833 15.2434 28.5827 16.3174 28.495C17.3827 28.408 18.0963 28.2389 18.686 27.9385C19.7992 27.3712 20.7044 26.4661 21.2716 25.3528C21.5721 24.7631 21.7411 24.0495 21.8282 22.9842C21.9159 21.9102 21.9165 20.5459 21.9165 18.6667V10.0952C21.9165 7.62221 20.2364 5.54013 17.9551 4.93066C17.5498 6.36532 16.231 7.41667 14.6667 7.41667H9.33334C7.76895 7.41667 6.45013 6.36528 6.04493 4.93058ZM18.0319 3.40635C21.1107 4.07587 23.4165 6.81549 23.4165 10.0952V18.6667V18.7008C23.4165 20.5388 23.4165 21.9642 23.3232 23.1064C23.2286 24.2645 23.0343 25.1974 22.6081 26.0338C21.8971 27.4293 20.7625 28.5639 19.3669 29.275C18.5305 29.7011 17.5976 29.8954 16.4396 29.99C15.2973 30.0833 13.8719 30.0833 12.0339 30.0833H11.9998H11.9658C10.1278 30.0833 8.70238 30.0833 7.56011 29.99C6.40205 29.8954 5.46914 29.7011 4.63275 29.275C3.23721 28.5639 2.1026 27.4293 1.39154 26.0338C0.965382 25.1974 0.771112 24.2645 0.676494 23.1064C0.583169 21.9641 0.583172 20.5388 0.583176 18.7008V18.6667V10.0952C0.583176 6.81537 2.88919 4.07567 5.96808 3.40627C6.24911 1.80232 7.64887 0.583333 9.33334 0.583333H14.6667C16.3512 0.583333 17.7509 1.80235 18.0319 3.40635ZM7.41667 4C7.41667 2.94145 8.27479 2.08333 9.33334 2.08333H14.6667C15.7252 2.08333 16.5833 2.94145 16.5833 4C16.5833 5.05855 15.7252 5.91667 14.6667 5.91667H9.33334C8.27479 5.91667 7.41667 5.05855 7.41667 4ZM7.24984 14.6667C7.24984 14.2525 7.58563 13.9167 7.99984 13.9167H15.9998C16.4141 13.9167 16.7498 14.2525 16.7498 14.6667C16.7498 15.0809 16.4141 15.4167 15.9998 15.4167H7.99984C7.58563 15.4167 7.24984 15.0809 7.24984 14.6667ZM7.99984 19.25C7.58563 19.25 7.24984 19.5858 7.24984 20C7.24984 20.4142 7.58563 20.75 7.99984 20.75H13.3332C13.7474 20.75 14.0832 20.4142 14.0832 20C14.0832 19.5858 13.7474 19.25 13.3332 19.25H7.99984Z"
                                  fill="#D2015F"/>
                        </svg>
                    </div>
                    <div class="home-menu__item_subtitle">
                        {{ $t('current_order') }}
                    </div>
                    <div class="home-menu__item_title">
                        {{ $formatCurrency(orderSum) }}
                    </div>
                </f7-link>
                <f7-link v-else-if="basketItems.length > 0 && !partner.only_menu" href="/basket/"
                         class="home-menu__item">
                    <div class="home-menu__item_icon">
                        <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M6.04493 4.93058C3.76346 5.53995 2.08318 7.6221 2.08318 10.0952V18.6667C2.08318 20.5459 2.08376 21.9102 2.17151 22.9842C2.25855 24.0495 2.42759 24.7631 2.72805 25.3528C3.2953 26.4661 4.20044 27.3712 5.31373 27.9385C5.90342 28.2389 6.61696 28.408 7.68226 28.495C8.75632 28.5827 10.1206 28.5833 11.9998 28.5833C13.8791 28.5833 15.2434 28.5827 16.3174 28.495C17.3827 28.408 18.0963 28.2389 18.686 27.9385C19.7992 27.3712 20.7044 26.4661 21.2716 25.3528C21.5721 24.7631 21.7411 24.0495 21.8282 22.9842C21.9159 21.9102 21.9165 20.5459 21.9165 18.6667V10.0952C21.9165 7.62221 20.2364 5.54013 17.9551 4.93066C17.5498 6.36532 16.231 7.41667 14.6667 7.41667H9.33334C7.76895 7.41667 6.45013 6.36528 6.04493 4.93058ZM18.0319 3.40635C21.1107 4.07587 23.4165 6.81549 23.4165 10.0952V18.6667V18.7008C23.4165 20.5388 23.4165 21.9642 23.3232 23.1064C23.2286 24.2645 23.0343 25.1974 22.6081 26.0338C21.8971 27.4293 20.7625 28.5639 19.3669 29.275C18.5305 29.7011 17.5976 29.8954 16.4396 29.99C15.2973 30.0833 13.8719 30.0833 12.0339 30.0833H11.9998H11.9658C10.1278 30.0833 8.70238 30.0833 7.56011 29.99C6.40205 29.8954 5.46914 29.7011 4.63275 29.275C3.23721 28.5639 2.1026 27.4293 1.39154 26.0338C0.965382 25.1974 0.771112 24.2645 0.676494 23.1064C0.583169 21.9641 0.583172 20.5388 0.583176 18.7008V18.6667V10.0952C0.583176 6.81537 2.88919 4.07567 5.96808 3.40627C6.24911 1.80232 7.64887 0.583333 9.33334 0.583333H14.6667C16.3512 0.583333 17.7509 1.80235 18.0319 3.40635ZM7.41667 4C7.41667 2.94145 8.27479 2.08333 9.33334 2.08333H14.6667C15.7252 2.08333 16.5833 2.94145 16.5833 4C16.5833 5.05855 15.7252 5.91667 14.6667 5.91667H9.33334C8.27479 5.91667 7.41667 5.05855 7.41667 4ZM7.24984 14.6667C7.24984 14.2525 7.58563 13.9167 7.99984 13.9167H15.9998C16.4141 13.9167 16.7498 14.2525 16.7498 14.6667C16.7498 15.0809 16.4141 15.4167 15.9998 15.4167H7.99984C7.58563 15.4167 7.24984 15.0809 7.24984 14.6667ZM7.99984 19.25C7.58563 19.25 7.24984 19.5858 7.24984 20C7.24984 20.4142 7.58563 20.75 7.99984 20.75H13.3332C13.7474 20.75 14.0832 20.4142 14.0832 20C14.0832 19.5858 13.7474 19.25 13.3332 19.25H7.99984Z"
                                  fill="#D2015F"/>
                        </svg>
                    </div>
                    <div class="home-menu__item_subtitle">
                        {{ $t('current_order') }}
                    </div>
                    <div class="home-menu__item_title">
                        {{ $formatCurrency(basketSum) }}
                    </div>
                </f7-link>
                <f7-link class="home-menu__item" popup-open=".wifi-popup">
                    <div class="home-menu__item_icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M2.79231 14.56C6.06858 10.9878 10.7723 8.75 15.9999 8.75C21.2274 8.75 25.9312 10.9878 29.2074 14.56C29.4874 14.8653 29.9618 14.8858 30.2671 14.6058C30.5724 14.3258 30.5929 13.8514 30.3129 13.5461C26.7645 9.67719 21.6651 7.25 15.9999 7.25C10.3347 7.25 5.23528 9.67719 1.68685 13.5461C1.40688 13.8514 1.42738 14.3258 1.73264 14.6058C2.03791 14.8858 2.51234 14.8653 2.79231 14.56ZM7.37608 17.503C9.62903 15.382 12.662 14.0833 15.9998 14.0833C19.3377 14.0833 22.3706 15.382 24.6236 17.503C24.9252 17.787 25.3998 17.7727 25.6838 17.4711C25.9677 17.1695 25.9534 16.6948 25.6518 16.4109C23.1317 14.0383 19.7349 12.5833 15.9998 12.5833C12.2648 12.5833 8.868 14.0383 6.34787 16.4109C6.04629 16.6948 6.03197 17.1695 6.31591 17.4711C6.59984 17.7727 7.0745 17.787 7.37608 17.503ZM15.9997 19.4167C14.2049 19.4167 12.5641 20.0679 11.2979 21.1478C10.9827 21.4166 10.5093 21.379 10.2406 21.0639C9.97176 20.7487 10.0094 20.2753 10.3245 20.0065C11.852 18.7038 13.8349 17.9167 15.9997 17.9167C18.1645 17.9167 20.1474 18.7038 21.6749 20.0065C21.9901 20.2753 22.0277 20.7487 21.7589 21.0639C21.4901 21.379 21.0167 21.4166 20.7016 21.1478C19.4353 20.0679 17.7945 19.4167 15.9997 19.4167ZM16 25.3333C16.7364 25.3333 17.3333 24.7364 17.3333 24C17.3333 23.2636 16.7364 22.6667 16 22.6667C15.2636 22.6667 14.6667 23.2636 14.6667 24C14.6667 24.7364 15.2636 25.3333 16 25.3333Z"
                                  fill="#D2015F"/>
                        </svg>
                    </div>
                    <div class="home-menu__item_subtitle">
                        {{ $t('wi_fi') }}
                    </div>
                    <div class="home-menu__item_title">
                        {{ $t('connect') }}
                    </div>
                </f7-link>
                <f7-link class="home-menu__item" popup-open=".contacts-popup">
                    <div class="home-menu__item_icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M2.79231 14.56C6.06858 10.9878 10.7723 8.75 15.9999 8.75C21.2274 8.75 25.9312 10.9878 29.2074 14.56C29.4874 14.8653 29.9618 14.8858 30.2671 14.6058C30.5724 14.3258 30.5929 13.8514 30.3129 13.5461C26.7645 9.67719 21.6651 7.25 15.9999 7.25C10.3347 7.25 5.23528 9.67719 1.68685 13.5461C1.40688 13.8514 1.42738 14.3258 1.73264 14.6058C2.03791 14.8858 2.51234 14.8653 2.79231 14.56ZM7.37608 17.503C9.62903 15.382 12.662 14.0833 15.9998 14.0833C19.3377 14.0833 22.3706 15.382 24.6236 17.503C24.9252 17.787 25.3998 17.7727 25.6838 17.4711C25.9677 17.1695 25.9534 16.6948 25.6518 16.4109C23.1317 14.0383 19.7349 12.5833 15.9998 12.5833C12.2648 12.5833 8.868 14.0383 6.34787 16.4109C6.04629 16.6948 6.03197 17.1695 6.31591 17.4711C6.59984 17.7727 7.0745 17.787 7.37608 17.503ZM15.9997 19.4167C14.2049 19.4167 12.5641 20.0679 11.2979 21.1478C10.9827 21.4166 10.5093 21.379 10.2406 21.0639C9.97176 20.7487 10.0094 20.2753 10.3245 20.0065C11.852 18.7038 13.8349 17.9167 15.9997 17.9167C18.1645 17.9167 20.1474 18.7038 21.6749 20.0065C21.9901 20.2753 22.0277 20.7487 21.7589 21.0639C21.4901 21.379 21.0167 21.4166 20.7016 21.1478C19.4353 20.0679 17.7945 19.4167 15.9997 19.4167ZM16 25.3333C16.7364 25.3333 17.3333 24.7364 17.3333 24C17.3333 23.2636 16.7364 22.6667 16 22.6667C15.2636 22.6667 14.6667 23.2636 14.6667 24C14.6667 24.7364 15.2636 25.3333 16 25.3333Z"
                                  fill="#D2015F"/>
                        </svg>
                    </div>
                    <div class="home-menu__item_subtitle">
                        {{ $t('wi_fi') }}
                    </div>
                    <div class="home-menu__item_title">
                        {{ $t('connect') }}
                    </div>
                </f7-link>
                <f7-link v-if="waiter.id && waiter.can_tips" class="home-menu__item" href="/tips/">
                    <div class="home-menu__item_icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M21.3225 4.75081C19.5122 4.72461 17.7836 5.34427 16.624 7.08351C16.4849 7.29216 16.2508 7.41748 16 7.41748C15.7493 7.41748 15.5151 7.29216 15.376 7.08352C14.221 5.35108 12.4614 4.75089 10.6667 4.75089C7.03989 4.75089 3.41667 7.78816 3.41667 12.0006C3.41667 16.3453 6.22145 20.157 9.33343 22.9413C10.876 24.3214 12.4599 25.4176 13.734 26.1659C14.3713 26.5402 14.9232 26.8227 15.3463 27.0089C15.5585 27.1022 15.7296 27.1675 15.8573 27.208C15.9333 27.2321 15.9789 27.2425 16 27.2469C16.0211 27.2425 16.0667 27.2321 16.1427 27.208C16.2704 27.1675 16.4415 27.1022 16.6537 27.0089C17.0769 26.8227 17.6287 26.5402 18.266 26.1659C19.5402 25.4176 21.1241 24.3214 22.6666 22.9413C25.7786 20.157 28.5833 16.3453 28.5833 12.0006C28.5833 7.79691 24.9675 4.80355 21.3225 4.75081ZM15.9987 5.44598C17.4705 3.80433 19.4383 3.22339 21.3442 3.25096C25.6992 3.31398 30.0833 6.87131 30.0833 12.0006C30.0833 16.9889 26.8881 21.177 23.6668 24.0591C22.0426 25.5123 20.3765 26.666 19.0256 27.4593C18.3505 27.8558 17.7461 28.167 17.2578 28.3818C17.0142 28.489 16.7908 28.5761 16.5962 28.6378C16.4205 28.6935 16.2041 28.75 16 28.75C15.7959 28.75 15.5795 28.6935 15.4038 28.6378C15.2092 28.5761 14.9858 28.489 14.7422 28.3818C14.254 28.167 13.6495 27.8558 12.9744 27.4593C11.6235 26.666 9.9574 25.5123 8.33326 24.0592C5.1119 21.177 1.91667 16.9889 1.91667 12.0006C1.91667 6.88006 6.29345 3.25089 10.6667 3.25089C12.5261 3.25089 14.5171 3.80644 15.9987 5.44598Z"
                                  fill="#D2015F"/>
                        </svg>
                    </div>
                    <div class="home-menu__item_title">
                        {{ $t('leave_tip') }}
                    </div>
                </f7-link>
                <f7-link v-if="events.length > 0" class="home-menu__item home-menu__item--events" href="/events/">
                    <div class="home-menu__item_title">
                        {{ $t('events_and_promotions') }}
                    </div>
                </f7-link>
            </div>
            <catalog :sections="sections" :active-section="activeSection" :items="items"/>
            <div class="footer">
                <a @click.stop="openLink('/public/Public-offer-resto-ranto.pdf')">
                    {{ $t('user_greement') }}
                </a>
            </div>
            <transition>
                <div class="home__footer padding-side"
                     v-if="isVisibleFooter"
                     :class="{'home__footer--order': (orderItems.length > 0 && !isOrderPaid) || basketItems.length > 0}"
                >
                    <f7-link v-if="events.length > 0" href="/events/" class="btn btn--gray footer-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M9.99999 0.0832537C4.52317 0.0832527 0.0833275 4.52309 0.0833265 9.99992C0.0833256 15.4767 4.52317 19.9166 9.99999 19.9166C15.4768 19.9166 19.9167 15.4767 19.9167 9.99992C19.9167 4.5231 15.4768 0.0832546 9.99999 0.0832537ZM18.4167 9.99992C18.4167 14.6483 14.6484 18.4166 9.99999 18.4166C5.35159 18.4166 1.58333 14.6483 1.58333 9.99992C1.58333 5.35152 5.3516 1.58325 9.99999 1.58325C14.6484 1.58325 18.4167 5.35152 18.4167 9.99992ZM5.41666 10.1666C5.17806 10.1666 4.95371 10.2801 4.81238 10.4723C4.67106 10.6646 4.62963 10.9126 4.70081 11.1403L5.41666 10.9166C4.70081 11.1403 4.70091 11.1406 4.70101 11.141L4.70124 11.1417L4.70178 11.1434L4.70318 11.1478L4.70734 11.1606C4.71071 11.1709 4.71529 11.1847 4.72111 11.2016C4.73276 11.2355 4.74943 11.2823 4.77141 11.3403C4.81533 11.456 4.88079 11.6168 4.97035 11.8079C5.14857 12.188 5.42694 12.6979 5.82832 13.2117C6.6328 14.2414 7.97524 15.3333 9.99999 15.3333C12.0247 15.3333 13.3672 14.2414 14.1717 13.2117C14.573 12.6979 14.8514 12.188 15.0296 11.8079C15.1192 11.6168 15.1847 11.456 15.2286 11.3403C15.2506 11.2823 15.2672 11.2355 15.2789 11.2016C15.2847 11.1847 15.2893 11.1709 15.2926 11.1606L15.2968 11.1478L15.2982 11.1434L15.2987 11.1417L15.299 11.141C15.2991 11.1406 15.2992 11.1403 14.5833 10.9166L15.2992 11.1403C15.3704 10.9126 15.3289 10.6646 15.1876 10.4723C15.0463 10.2801 14.8219 10.1666 14.5833 10.1666L5.41666 10.1666ZM7.01034 12.2882C6.84542 12.0771 6.70571 11.8649 6.58933 11.6666L13.4107 11.6666C13.2943 11.8649 13.1546 12.0771 12.9896 12.2882C12.3618 13.0918 11.4126 13.8333 9.99999 13.8333C8.58742 13.8333 7.6382 13.0918 7.01034 12.2882ZM8.16666 7.24992C8.16666 7.75618 7.75625 8.16659 7.24999 8.16659C6.74373 8.16659 6.33333 7.75618 6.33333 7.24992C6.33333 6.74366 6.74373 6.33325 7.24999 6.33325C7.75626 6.33325 8.16666 6.74366 8.16666 7.24992ZM12.75 8.16659C13.2563 8.16659 13.6667 7.75618 13.6667 7.24992C13.6667 6.74366 13.2563 6.33325 12.75 6.33325C12.2437 6.33325 11.8333 6.74366 11.8333 7.24992C11.8333 7.75618 12.2437 8.16659 12.75 8.16659Z"
                                  fill="white"/>
                        </svg>
                        <span>{{ $t('events_and_promotions') }}</span>
                    </f7-link>
                    <f7-button v-if="!partner.hide_call_waiter" class="btn footer-btn"
                               popup-open=".waiter-popup"
                               :class="{'btn--gray': (orderItems.length > 0 && !isOrderPaid && !partner.only_menu) || basketItems.length > 0,
                                        'btn--pink': !((orderItems.length > 0 && !isOrderPaid && !partner.only_menu) || basketItems.length > 0)}"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 16L22 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M4 19L20 19" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M20 16C20 10.4771 18.5 6 12 6C5.5 6 4 10.4772 4 16" stroke="white"
                                  stroke-width="1.5"/>
                            <path
                                d="M13.7324 6C13.9026 5.70583 14 5.36429 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 9.99999 3.89543 9.99999 5C9.99999 5.36429 10.0974 5.70583 10.2676 6"
                                stroke="white" stroke-width="1.5"/>
                        </svg>
                        <span>{{ $t('call') }}</span>
                    </f7-button>
                    <f7-link v-if="orderItems.length > 0 && !isOrderPaid && !partner.only_menu" href="/order/"
                             class="btn btn--pink footer-btn">
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4.75573 3.6799C3.39572 4.13898 2.41656 5.42608 2.41656 6.94056L2.41656 12.8334C2.41656 14.1292 2.41714 15.056 2.47651 15.7827C2.53516 16.5006 2.64744 16.9568 2.83436 17.3237C3.20188 18.045 3.7883 18.6314 4.50959 18.9989C4.87645 19.1859 5.33274 19.2981 6.05064 19.3568C6.77729 19.4162 7.70406 19.4167 8.99989 19.4167C10.2957 19.4167 11.2225 19.4162 11.9491 19.3568C12.667 19.2981 13.1233 19.1859 13.4902 18.9989C14.2115 18.6314 14.7979 18.045 15.1654 17.3237C15.3523 16.9569 15.4646 16.5006 15.5233 15.7827C15.5826 15.056 15.5832 14.1292 15.5832 12.8334L15.5832 6.94056C15.5832 5.42616 14.6042 4.13911 13.2443 3.67997C12.8709 4.64724 11.9323 5.33342 10.8333 5.33342L7.16667 5.33342C6.06771 5.33342 5.12903 4.64721 4.75573 3.6799ZM13.3461 2.14785C15.4931 2.68546 17.0832 4.62655 17.0832 6.94056L17.0832 12.8334L17.0832 12.8668L17.0832 12.8669C17.0832 14.1221 17.0832 15.11 17.0183 15.9048C16.9521 16.7155 16.8145 17.3911 16.5019 18.0047C15.9906 19.0082 15.1747 19.8241 14.1712 20.3355C13.5576 20.6481 12.8819 20.7856 12.0713 20.8518C11.2764 20.9168 10.2885 20.9168 9.03326 20.9167L8.99989 20.9167L8.96651 20.9167C7.71131 20.9168 6.72336 20.9168 5.92849 20.8518C5.11783 20.7856 4.44217 20.6481 3.8286 20.3354C2.82507 19.8241 2.00918 19.0082 1.49785 18.0047C1.18523 17.3911 1.04772 16.7155 0.98149 15.9048C0.916546 15.1099 0.91655 14.122 0.916555 12.8668L0.916555 12.8334L0.916556 6.94056C0.916557 4.62647 2.50685 2.68531 4.65392 2.14779C4.92527 1.01155 5.94731 0.166749 7.16667 0.166749L10.8333 0.16675C12.0527 0.16675 13.0748 1.01159 13.3461 2.14785ZM6.08334 2.75008C6.08334 2.15177 6.56836 1.66675 7.16667 1.66675L10.8333 1.66675C11.4316 1.66675 11.9167 2.15178 11.9167 2.75008C11.9167 3.34839 11.4316 3.83342 10.8333 3.83342L7.16667 3.83342C6.56836 3.83342 6.08334 3.34839 6.08334 2.75008ZM5.49989 10.0834C5.49989 9.6692 5.83568 9.33341 6.24989 9.33342L11.7499 9.33342C12.1641 9.33342 12.4999 9.6692 12.4999 10.0834C12.4999 10.4976 12.1641 10.8334 11.7499 10.8334L6.24989 10.8334C5.83568 10.8334 5.49989 10.4976 5.49989 10.0834ZM6.24989 13.0001C5.83567 13.0001 5.49989 13.3359 5.49989 13.7501C5.49989 14.1643 5.83567 14.5001 6.24989 14.5001L9.91655 14.5001C10.3308 14.5001 10.6666 14.1643 10.6666 13.7501C10.6666 13.3359 10.3308 13.0001 9.91656 13.0001L6.24989 13.0001Z"
                                  fill="white"/>
                        </svg>
                        <div>
                            <div class="footer-btn__title">
                                {{ $t('order') }}
                            </div>
                            <div class="footer-btn__sum">
                                {{ $formatCurrency(orderSum) }}
                            </div>
                        </div>
                    </f7-link>
                    <f7-link v-else-if="basketItems.length > 0 && !partner.only_menu" href="/basket/"
                             class="btn btn--pink footer-btn">
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4.75573 3.6799C3.39572 4.13898 2.41656 5.42608 2.41656 6.94056L2.41656 12.8334C2.41656 14.1292 2.41714 15.056 2.47651 15.7827C2.53516 16.5006 2.64744 16.9568 2.83436 17.3237C3.20188 18.045 3.7883 18.6314 4.50959 18.9989C4.87645 19.1859 5.33274 19.2981 6.05064 19.3568C6.77729 19.4162 7.70406 19.4167 8.99989 19.4167C10.2957 19.4167 11.2225 19.4162 11.9491 19.3568C12.667 19.2981 13.1233 19.1859 13.4902 18.9989C14.2115 18.6314 14.7979 18.045 15.1654 17.3237C15.3523 16.9569 15.4646 16.5006 15.5233 15.7827C15.5826 15.056 15.5832 14.1292 15.5832 12.8334L15.5832 6.94056C15.5832 5.42616 14.6042 4.13911 13.2443 3.67997C12.8709 4.64724 11.9323 5.33342 10.8333 5.33342L7.16667 5.33342C6.06771 5.33342 5.12903 4.64721 4.75573 3.6799ZM13.3461 2.14785C15.4931 2.68546 17.0832 4.62655 17.0832 6.94056L17.0832 12.8334L17.0832 12.8668L17.0832 12.8669C17.0832 14.1221 17.0832 15.11 17.0183 15.9048C16.9521 16.7155 16.8145 17.3911 16.5019 18.0047C15.9906 19.0082 15.1747 19.8241 14.1712 20.3355C13.5576 20.6481 12.8819 20.7856 12.0713 20.8518C11.2764 20.9168 10.2885 20.9168 9.03326 20.9167L8.99989 20.9167L8.96651 20.9167C7.71131 20.9168 6.72336 20.9168 5.92849 20.8518C5.11783 20.7856 4.44217 20.6481 3.8286 20.3354C2.82507 19.8241 2.00918 19.0082 1.49785 18.0047C1.18523 17.3911 1.04772 16.7155 0.98149 15.9048C0.916546 15.1099 0.91655 14.122 0.916555 12.8668L0.916555 12.8334L0.916556 6.94056C0.916557 4.62647 2.50685 2.68531 4.65392 2.14779C4.92527 1.01155 5.94731 0.166749 7.16667 0.166749L10.8333 0.16675C12.0527 0.16675 13.0748 1.01159 13.3461 2.14785ZM6.08334 2.75008C6.08334 2.15177 6.56836 1.66675 7.16667 1.66675L10.8333 1.66675C11.4316 1.66675 11.9167 2.15178 11.9167 2.75008C11.9167 3.34839 11.4316 3.83342 10.8333 3.83342L7.16667 3.83342C6.56836 3.83342 6.08334 3.34839 6.08334 2.75008ZM5.49989 10.0834C5.49989 9.6692 5.83568 9.33341 6.24989 9.33342L11.7499 9.33342C12.1641 9.33342 12.4999 9.6692 12.4999 10.0834C12.4999 10.4976 12.1641 10.8334 11.7499 10.8334L6.24989 10.8334C5.83568 10.8334 5.49989 10.4976 5.49989 10.0834ZM6.24989 13.0001C5.83567 13.0001 5.49989 13.3359 5.49989 13.7501C5.49989 14.1643 5.83567 14.5001 6.24989 14.5001L9.91655 14.5001C10.3308 14.5001 10.6666 14.1643 10.6666 13.7501C10.6666 13.3359 10.3308 13.0001 9.91656 13.0001L6.24989 13.0001Z"
                                  fill="white"/>
                        </svg>
                        <div>
                            <div class="footer-btn__title">
                                {{ $t('order') }}
                            </div>
                            <div class="footer-btn__sum">
                                {{ $formatCurrency(basketSum) }}
                            </div>
                        </div>
                    </f7-link>
                </div>
            </transition>
        </div>
        <waiter-popup :waiter="waiter"/>
        <wi-fi-popup :partner="partner"/>
        <contacts-popup :partner="partner"/>
        <catalog-card-popup/>
        <tips-payment-confirm-popup/>
        <order-payment-confirm-popup/>

    </f7-page>
</template>

<script>
    import YourWaiter from "@/components/waiter/YourWaiter.vue";
    import Catalog from "@/components/catalog/Catalog.vue";
    import WaiterPopup from "@/components/waiter/WaiterPopup.vue";
    import {onMounted, computed, ref, onBeforeMount} from 'vue';
    import store from '@/store/store'
    import CatalogCardPopup from "@/components/catalog/CatalogCardPopup.vue";
    import WiFiPopup from "@/components/WiFiPopup.vue";
    import {f7} from "framework7-vue";
    import axios from "axios";
    import TipsPaymentConfirmPopup from "@/components/tips/TipsPaymentConfirmPopup.vue";
    import OrderPaymentConfirmPopup from "@/components/order/OrderPaymentConfirmPopup.vue";
    import ContactsPopup from "@/components/ContactsPopup.vue";

    export default {
        components: {
            ContactsPopup,
            WiFiPopup,
            CatalogCardPopup,
            WaiterPopup,
            YourWaiter,
            Catalog,
            TipsPaymentConfirmPopup,
            OrderPaymentConfirmPopup
        },
        props: {
            f7router: Object,
        },
        setup(props) {
            const items = computed(() => {
                return store.getters['catalog/items']
            });
            const sections = computed(() => {
                return store.getters['catalog/sections']
            });
            const activeSection = computed(() => {
                return store.getters['catalog/activeSection']
            });
            const basketSum = computed(() => {
                return store.getters['basket/sum']
            });
            const basketItems = computed(() => {
                return store.getters['basket/items']
            });
            const orderSum = computed(() => {
                return store.getters['order/sum']
            });
            const orderItems = computed(() => {
                return store.getters['order/items']
            });
            const waiter = computed(() => {
                return store.getters['waiter/waiter']
            });
            const partner = computed(() => {
                return store.getters['partner/partner']
            });
            const isOrderPaid = computed(() => {
                return store.getters['order/isPaid']
            });
            const events = computed(() => {
                return store.getters['events/items']
            });

            const isVisibleFooter = ref(false);

            onMounted(async () => {
                const f7page = document.querySelectorAll('#home:not(.page-previous)')[0];
                const scrollableDiv = f7page.querySelector('.page-content');
                const waiterCallBtn = f7page.querySelector('.home__waiter');

                if (waiterCallBtn) {
                    scrollableDiv.addEventListener('scroll', onScroll);
                    scrollableDiv.waiterCallBtnOffsetTop = waiterCallBtn.getBoundingClientRect().top;
                }

                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('operation') && urlParams.has('reference')) {
                    const reference = urlParams.get('reference');
                    const orderId = parseInt(reference.split('P')[0].substring(1));
                    const paymentId = parseInt(reference.split('P')[1]);

                    let isPaid = false;
                    let isTipsOrder = false;
                    let isOrderWithTips = false;
                    if (orderId === store.getters['order/id']) {
                        isPaid = store.getters['order/isPaid'];
                        const payments = store.getters['order/payments'];
                        if (payments[paymentId] && payments[paymentId].is_paid) {
                            const paidItems = payments[paymentId].items;
                            if (paidItems.find(item => item?.IS_TIPS === true)) {
                                isOrderWithTips = true;
                            }
                        }
                    } else {
                        const order = await axios.get(import.meta.env.VITE_API_URL + `/order/?id=${orderId}`, {withCredentials: true})
                            .then(response => {
                                return response.data.data;
                            })

                        isTipsOrder = order.is_tips_order;
                        isPaid = order.is_paid;
                        store.commit('tips/setIsTipsOrder', isTipsOrder);
                        store.commit('tips/setIsPaid', isPaid);
                    }

                    if (isPaid) {
                        store.commit('order/setSplitBill', false);
                    }

                    if (isPaid && (isOrderWithTips || isTipsOrder)) {
                        if (isTipsOrder) {
                            f7.popup.open('.tips-payment-popup');
                        } else if (isOrderWithTips) {
                            f7.popup.open('.order-payment-confirm-popup');
                        }
                        window.history.replaceState(null, '', window.location.pathname);
                    } else {
                        setTimeout(() => {
                            const route = (isPaid && waiter.value.id) || isTipsOrder ? '/tips/' : '/order/';
                            //store.commit('order/setIsOpenPaymentModal', true);
                            props.f7router.navigate(route);
                        }, 100)
                    }
                }

                if (urlParams.has('items') && orderItems.value.length > 0 && !isOrderPaid.value && !partner.value.only_menu) {
                    setTimeout(() => {
                        props.f7router.navigate('/order/');
                    }, 100)
                }
            });

            onBeforeMount(async () => {

            });

            const onScroll = (event) => {
                const scrollTop = event.target.scrollTop;
                const waiterCallBtnOffsetTop = event.target.sectionNavOffsetTop;

                isVisibleFooter.value = scrollTop > waiterCallBtnOffsetTop - 150;
            }

            const openLink = (url) => {
                window.open(url)
            }

            const openWaiterPopup = () => {
                store.commit('waiter/setComment', '');
            }

            return {
                items,
                sections,
                activeSection,
                basketSum,
                basketItems,
                orderSum,
                orderItems,
                waiter,
                partner,
                isVisibleFooter,
                isOrderPaid,
                openLink,
                openWaiterPopup,
                events
            };
        }
    }
</script>
