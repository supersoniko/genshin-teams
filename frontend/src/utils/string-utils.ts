export const toId = (text: string): string => {
	if (typeof text !== 'string' && typeof text !== 'number') {
		return ''
	}

	return String(text)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '')
}
