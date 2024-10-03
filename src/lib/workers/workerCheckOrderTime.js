import {sendAiSystemMessage} from "@/services/sendAiSystemMessage";

export const workerCheckOrderTime = async (intervalId) => {
	const orderCreationTime = localStorage.getItem('orderCreationTime');
	if (orderCreationTime) {
		const currentTime = Date.now();
		const timeDifference = currentTime - orderCreationTime;
		
		//if (timeDifference >= 900000) { // 15 минут
		if (timeDifference >= 10000) {
			clearInterval(intervalId);
			
			const sentEvents = JSON.parse(localStorage.getItem('sentEvents')) || [];
			if (!sentEvents.includes('afterOrderCreate')) {
				const response = await sendAiSystemMessage('afterOrderCreate');
				if (!response.error) {
					console.log('close')
					window.widget.close();
					setTimeout(() => {
						console.log('open')
						window.widget.open();
					}, 2000)
					
					sentEvents.push('afterOrderCreate');
					localStorage.setItem('sentEvents', JSON.stringify(sentEvents))
				}
			}
		}
	}
};