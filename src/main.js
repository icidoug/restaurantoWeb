import {createApp} from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, {registerComponents} from 'framework7-vue/bundle';
import App from './App.vue';
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/scss/main.scss'

Framework7.use(Framework7Vue);

const app = createApp(App)

registerComponents(app);

app
    //.use(router)
    .use(VueAxios, axios)
    .mount('#app');