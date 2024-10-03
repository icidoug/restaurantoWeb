import axios from 'axios';
import {getConversationId} from '@/utils/localStorageUtils';

export const sendAiSystemMessage = async (event) => {
	try {
		const conversation_id = getConversationId();
		if (!conversation_id) {
			throw new Error('conversation_id не найден');
		}
		
		const payload = {
			action: 'message',
			event,
			conversation_id,
		};
		
		if (localStorage.lastOrderId) {
			payload.order_id = localStorage.lastOrderId;
		}
		
		const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat/`, payload);
		return response.data;
	} catch (error) {
		return {error: error.message};
	}
};
