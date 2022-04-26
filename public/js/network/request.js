export default {
	sendRequest: async (method, url, body = null) => {
		const headers = {
			'Content-Type': 'application/json',
		}
		return fetch(url, {
			method: method,
			body: body ? JSON.stringify(body) : null,
			headers: headers,
		}).then((res) => res.json())
	},
	sendFile: async (method, url, data)=> {
		return fetch(url, {
			method: method,
			body: data,
		}).then((res) => res.json())
	}
}
