import store from "@/store/store";
import {f7} from "framework7-vue";

export const workerCheckOrder = async (id) => {
	const result = await store.dispatch('order/checkOrderPayment', id);
	if (result?.is_paid && localStorage.lastOrderId && localStorage?.paidOrderId === localStorage.lastOrderId) {
		console.log('localStorage.lastOrderId', localStorage.lastOrderId)
		store.commit('order/setIsOpenPayDalaModal', false);
		store.commit('order/setItems', []);
		setTimeout(async () => {
			f7.views.current.router.navigate('/')
			f7.popup.open('.order-payment-confirm-popup');
			localStorage.lastOrderId = null;
			localStorage.paidOrderId = null;
		}, 200)
		
	} else {
		setTimeout(async () => {
			await workerCheckOrder(id);
		}, 5000)
	}
}