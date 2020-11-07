const defaultHeaders = {
	'Content-Type': 'application/json; charset=utf-8'
}

// eslint-disable-next-line no-undef
export const consumeJson = async (input: RequestInfo, init?: RequestInit): Promise<any> => {
	const result = await fetch(input, {
		...init,
		headers: {...defaultHeaders, ...init.headers}
	})

	if (result.status !== 200) {
		throw new Error('Request failed')
	}

	return result.json()
}
