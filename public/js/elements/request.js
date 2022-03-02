function sendRequest(method, url, body = null) {
	const headers = {
		'Content-Type': 'application/json',
	}
	return fetch(url, {
		method: method,
		body: body ? JSON.stringify(body) : null,
		headers: headers,
	}).then((res) => res.json())
}

async function sendFile(method, url, data) {
	return fetch(url, {
		method: method,
		body: data,
	}).then((res) => res.json())
}

export { sendRequest, sendFile }
