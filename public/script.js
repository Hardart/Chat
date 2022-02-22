const loginButton = document.querySelector('.login-form')
const logoutButton = document.querySelector('.exit')

socket.on('connect', () => {
	if (loginButton) {
		loginButton.onsubmit = (e) => {
			e.preventDefault()
			const userName = document.querySelector('.name')
			userName.value = userName.value.trim()

			const user = {
				id: socket.id,
				name: userName.value,
			}
			sendRequest('post', '/', user).then((res) => {
				const usersCount = document.querySelector('.users-count')
				if (!res.status) return
				usersCount.innerText = res.users
				const closeModal = document.querySelector('#modal-full')
				const titleBlock = document.querySelector('.chat-title-block')
				titleBlock.children[0].insertAdjacentHTML('afterend', setupUserName(userName))
				closeModal.classList.remove('uk-open', 'uk-flex')
				const logoutButton = document.querySelector('.exit')
				socket.emit('user-login', userName.value)
				tapLogout(logoutButton)
			})
		}
	}
})

if (logoutButton) {
	tapLogout(logoutButton)
}

function tapLogout(btn) {
	btn.onclick = () => {
		socket.emit('logout')
		sendRequest('post', '/logout').then((res) => {
			if (res.callback == 'ok') {
				window.location = './'
			}
		})
	}
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

function setupUserName(input) {
	return `<div class="uk-flex uk-flex-middle">
					<h3 id="user-name" class="uk-margin-remove">${input.value}</h3>
					<a class="uk-margin-left uk-text-small exit">Выход</a>
				</div>`
}
