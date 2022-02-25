const loginButton = document.querySelector('.login-form')
const logoutButton = document.querySelector('.exit')
const usersToggleBtn = document.querySelector('.users-panel-toggle')
const usersPanel = document.querySelector('.users-panel')
const app = document.querySelector('.app-container')

usersToggleBtn.onclick = () => {
	usersPanel.classList.toggle('uk-hidden')
	if (usersPanel.classList.contains('uk-hidden')) return usersPanel.remove()
	app.insertAdjacentElement('beforeend', usersPanel)
}
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
