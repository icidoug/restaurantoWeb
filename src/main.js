import {createApp} from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, {registerComponents} from 'framework7-vue/bundle';
import App from './App.vue';
import router from './router'
import Cookies from 'js-cookie'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/scss/main.scss'

const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('table')) {
	Cookies.set('table', urlParams.get('table'), { expires: 1 })
}
if(urlParams.has('zone')) {
	Cookies.set('zone', urlParams.get('zone'), { expires: 1 })
}
if(urlParams.has('partner')) {
	Cookies.set('partner', urlParams.get('partner'), { expires: 1 })
}

Framework7.use(Framework7Vue);

const app = createApp(App)

registerComponents(app);

axios.defaults.withCredentials = true;
axios.defaults.headers.common['partner'] = Cookies.get('partner') || '';

app.use(VueAxios, axios)
	.mount('#app');