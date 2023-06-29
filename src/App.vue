<template>
    <f7-app v-bind="f7params">
        <Transition>
        <div class="app-view" v-if="partner.id">
            <div v-if="isFetching" class="app-preloader">
                <preloader/>
            </div>
            <f7-views v-else-if="waiter.id" tabs class="safe-areas">
                <f7-view id="view-home" main tab tab-active url="/"></f7-view>
            </f7-views>
            <div v-else class="app-empty-table">
                Для начала работы с системой, отсканируйте QR код расположенный на столе
            </div>
        </div>
        </Transition>
    </f7-app>
</template>
<script setup>
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
    const partner = computed(() => {
        return store.getters['partner/partner']
    });

    onMounted(() => {
        f7ready(async () => {
            await store.dispatch('partner/getPartner').then(settings => {
                const urlParams = new URLSearchParams(window.location.search);
                if(settings.dark_theme || urlParams.get('dark')) {
                    f7.setDarkMode(true);
                }
            })

            isFetching.value = true;

            const table = Cookies.get('table') || null;
            const zone = Cookies.get('zone') || null;
            if(table && zone) {
                await store.dispatch('waiter/getWaiter', {table, zone});
                if(waiter.value.id) {
                    await store.dispatch('catalog/getSections');
                    await store.dispatch('catalog/getItems');
                    await store.dispatch('basket/getItems');
                    await store.dispatch('order/getOrder');
                    await store.dispatch('events/getItems');
                    if(store.getters['order/items'].length > 0) {
                        //console.log(f7.views[0].navigate('/tips'))
                        //store.commit('tips/setTipsType', 'none');
                    }
                }
            }

            isFetching.value = false;
        });
    });
</script>