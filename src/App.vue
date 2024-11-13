<template>
    <f7-app v-bind="f7params">
        <Transition>
            <div class="app-view" v-if="partner.id">
                <div v-if="isFetching" class="app-preloader">
                    <!--                    <init-preloader :is-dark-mode="isDarkMode"/>-->
                    <Preloader/>
                </div>
                <div v-else-if="isError" class="app-empty-table">
                    {{ $t('start_system_scan_qr') }}
                </div>
                <f7-views v-else tabs class="safe-areas">
                    <f7-view id="view-home" main tab tab-active url="/"></f7-view>
                </f7-views>
            </div>
        </Transition>
    </f7-app>
</template>
<script setup type="module">
    import Chatbox from 'https://a.8up.ru/dist/chatbox/index.js';
    import {onMounted, ref, computed} from 'vue';
    import {
        f7ready,
    } from 'framework7-vue';
    import {getDevice} from 'framework7/lite-bundle';
    import routes from './routes';
    import {f7} from 'framework7-vue';
    import store from '@/store/store'
    import Preloader from "@/components/Preloader.vue";
    import Cookies from "js-cookie";
    import InitPreloader from "@/components/InitPreloader.vue";
    import {workerCheckOrderPayment} from "@/lib/workers/workerCheckOrderPayment";
    import axios from "axios";
    import { i18n } from './main.js';

    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
        name: 'Restauranto', // App name
        theme: 'ios', // Automatic theme detection
        id: 'app.f7restauranto', // App bundle ID
        // App routes
        routes: routes,

        // Input settings
        input: {
            scrollIntoViewOnFocus: device.capacitor,
            scrollIntoViewCentered: device.capacitor,
        },
        // Capacitor Statusbar settings
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },
    };

    const isFetching = ref(false);

    const waiter = computed(() => {
        return store.getters['waiter/waiter']
    });
    const isError = computed(() => {
        return store.getters['waiter/isError']
    });
    const partner = computed(() => {
        return store.getters['partner/partner']
    });
    const isDarkMode = ref(false);

    const getWaiter = () => {
        store.dispatch('waiter/getWaiter', {table, zone});
    }

    onMounted(() => {
        f7ready(async () => {
            await store.dispatch('partner/getPartner').then(async settings => {
                console.log({settings})
                console.log({i18n})
                if (settings.language && i18n.global.availableLocales.includes(settings.language)) {
                    i18n.global.locale.value = settings.language;
                } else {
                    i18n.global.locale.value = "en"; // Устанавливаем "en" по умолчанию
                }

                const urlParams = new URLSearchParams(window.location.search);
                const styles = document.querySelector("#app").style;
                if (settings.dark_theme || urlParams.get('dark')) {
                    f7.setDarkMode(true);
                    isDarkMode.value = true;
                }
                if (settings.theme_color) {
                    const setOpacity = (hex, alpha) => `${hex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`

                    styles.setProperty('--pink', settings.theme_color);
                    styles.setProperty('--f7-theme-color', settings.theme_color);
                    //.setProperty('--pink-hover', setOpacity(settings.theme_color, 0.8));
                    styles.setProperty('--pink-hover', settings.theme_color);
                }
                if (settings.text_color) {
                    styles.setProperty('--btn-text-color', settings.text_color);
                }
                document.title = settings.name;

                if (settings?.agent?.id && settings.show_chat_widget) {
                    const widgetParams = {
                        agentId: settings.agent.id,
                        interface: {}
                    };
                    if (settings?.agent?.initial_messages) {
                        widgetParams.interface.initialMessages = settings?.agent?.initial_messages;
                    }
                    if (settings?.agent?.message_templates) {
                        widgetParams.interface.messageTemplates = settings?.agent?.message_templates;
                    }

                    window.widget = await Chatbox.initBubble(widgetParams);

                    /* await axios.get(import.meta.env.VITE_API_URL + `/chat/?action=getConversation`, {withCredentials: true})
                         .then(response => {
                             //return response.data.data;
                         })*/
                }

                if (urlParams.get('item')) {
                    store.commit('catalog/setIsOpenModal', true);
                    store.dispatch('catalog/getDetail', urlParams.get('item'));
                }
            })

            isFetching.value = true;

            const table = Cookies.get('table') || null;
            const zone = Cookies.get('zone') || null;
            if (table && zone) {
                await store.dispatch('waiter/getWaiter', {table, zone});
                if (!isError.value) {
                    await store.dispatch('catalog/getSections');
                    await store.dispatch('catalog/getItems');
                    await store.dispatch('basket/getItems');
                    const order = await store.dispatch('order/getOrder');

                    if (order.id) {
                        workerCheckOrderPayment(order.id);
                    }

                    await store.dispatch('events/getItems');
                    if (store.getters['order/items'].length > 0) {
                        //console.log(f7.views[0].navigate('/tips'))
                        //store.commit('tips/setTipsType', 'none');
                    }
                }
            }

            isFetching.value = false;
        });
    });
</script>