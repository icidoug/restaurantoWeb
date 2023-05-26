<template>
    <f7-app v-bind="f7params">
        <div v-if="isFetching" class="app-preloader">
            <preloader/>
        </div>
        <f7-views v-else tabs class="safe-areas">
            <f7-view id="view-home" main tab tab-active url="/"></f7-view>
        </f7-views>
    </f7-app>
</template>
<script setup>
    import {onMounted, ref} from 'vue';
    import {
        f7ready,
    } from 'framework7-vue';
    import {getDevice} from 'framework7/lite-bundle';
    import routes from './routes';
    import {f7} from 'framework7-vue';
    import store from '@/store/store'
    import Preloader from "@/components/Preloader.vue";

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

    const isFetching = ref(true);

    onMounted(() => {
        f7ready(async () => {
            isFetching.value = true;
            await store.dispatch('waiter/getWaiter');
            await store.dispatch('partner/getPartner');
            await store.dispatch('catalog/getSections');
            await store.dispatch('catalog/getItems');
            await store.dispatch('basket/getItems');
            await store.dispatch('order/getOrder');
            isFetching.value = false;
        });
    });
</script>