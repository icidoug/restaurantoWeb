<template>
    <f7-app v-bind="f7params">
        <f7-views tabs class="safe-areas">
            <f7-view id="view-home" main tab tab-active url="/"></f7-view>
        </f7-views>
    </f7-app>
</template>
<script setup>
    import {onMounted} from 'vue';
    import {
        f7ready,
    } from 'framework7-vue';
    import {getDevice} from 'framework7/lite-bundle';
    import routes from './routes';
    import {f7} from 'framework7-vue';

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

    onMounted(() => {
        f7ready(() => {

            // Init capacitor APIs (see capacitor-app.js)
            /*if (device.capacitor) {
                capacitorApp.init(f7);
            }*/
            // Call F7 APIs here
        });
    });
</script>