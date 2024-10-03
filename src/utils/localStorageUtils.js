export function getConversationId() {
	const key = Object.keys(localStorage).find(k => k.startsWith('iFrameConversationId-'));
	return key ? localStorage.getItem(key) : null;
}