const vkAuthBtn = document.querySelector('.vkAuth')

vkAuthBtn.onclick = () => {
	const link = 'https://oauth.vk.com/authorize?client_id=8086306&redirect_uri=http://pmsokolova.ru/login&display=popup&response_type=token'
	sendRequest('get', link).then((res) => {
		console.log(res)
	})
}

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
