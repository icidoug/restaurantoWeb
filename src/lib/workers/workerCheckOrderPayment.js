import store from "@/store/store";
import {f7} from "framework7-vue";
import {sendAiSystemMessage} from "@/services/sendAiSystemMessage";

export const workerCheckOrderPayment = async (id) => {
	const result = await store.dispatch('order/checkOrderPayment', id);
	if (result?.is_paid && localStorage.lastOrderId && localStorage?.paidOrderId === localStorage.lastOrderId) {
		console.log('localStorage.lastOrderId', localStorage.lastOrderId)
		store.commit('order/setIsOpenPayDalaModal', false);
		store.commit('order/setItems', []);
		setTimeout(async () => {
			f7.views.current.router.navigate('/')
			f7.popup.open('.order-payment-confirm-popup');
			
			const sentEvents = JSON.parse(localStorage.getItem('sentEvents')) || [];
			if (!sentEvents.includes('afterOrderPay')) {
				sentEvents.push('afterOrderPay');
				localStorage.setItem('sentEvents', JSON.stringify(sentEvents))
				
				const response = await sendAiSystemMessage('afterOrderPay');
				if (!response.error) {
					window.widget.close();
					setTimeout(() => {
						window.widget.open();
					}, 2000)
				}
			}
			
			localStorage.lastOrderId = null;
			localStorage.paidOrderId = null;
		}, 200)
		
	} else {
		setTimeout(async () => {
			await workerCheckOrderPayment(id);
		}, 5000)
	}
}