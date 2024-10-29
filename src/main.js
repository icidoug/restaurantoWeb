import {createApp} from 'vue';
import Framework7 from 'framework7/lite-bundle';
import Framework7Vue, {registerComponents} from 'framework7-vue/bundle';
import App from './App.vue';
import router from './router'
import Cookies from 'js-cookie'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue3Lottie from 'vue3-lottie'
import { createI18n } from "vue-i18n";
import './assets/scss/main.scss'
import messages from "@intlify/unplugin-vue-i18n/messages";
import store from '@/store/store'

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: "en",
	fallbackLocale: "en",
	availableLocales: ["en", "ru"],
	messages: messages,
});

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

app.config.globalProperties.$formatCurrency = (amount) => {
	const template = store.getters['partner/partner'].currency_template || '$#';
	const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
	
	if (isNaN(numericAmount)) return template.replace('#', '0');
	
	const formattedAmount = numericAmount % 1 === 0 ? numericAmount.toFixed(0) : numericAmount.toFixed(2);
	
	return template.replace('#', formattedAmount);
}

app.use(VueAxios, axios)
	.use(Vue3Lottie)
	.use(i18n)
	.mount('#app');