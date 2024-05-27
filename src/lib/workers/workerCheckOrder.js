import store from "@/store/store";
import {f7} from "framework7-vue";

export const workerCheckOrder = async (id) => {
	const result = await store.dispatch('order/checkOrderPayment', id);
	if (result?.is_paid) {
		store.commit('order/setIsOpenPayDalaModal', false);
		f7.views.current.router.navigate('/')
		f7.popup.open('.order-payment-confirm-popup');
		localStorage.lastOrderId = null;
	} else {
		setTimeout(async () => {
			await workerCheckOrder(id);
		}, 5000)
	}
}