import { sendRequest } from './elements/request.js'
const app = document.getElementById('app')
const chatApp = document.querySelector('.app-container')
const usersAsidePanel = document.querySelector('.users-panel')
const usersSetupPanel = document.querySelector('.user-setup-panel')
const logoutButton = document.querySelector('.exit')
const setupButton = document.querySelector('.setup')
const usersToggleBtn = document.querySelector('.users-panel-toggle')

usersSetupPanel.remove()

usersToggleBtn.onclick = () => {
	usersAsidePanel.classList.toggle('uk-hidden')
	if (usersAsidePanel.classList.contains('uk-hidden')) return usersAsidePanel.remove()
	chatApp.insertAdjacentElement('beforeend', usersAsidePanel)
}
if (logoutButton) {
	tapLogout(logoutButton)
	enterSetupMenu(setupButton)
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

function enterSetupMenu(btn) {
	btn.onclick = () => {
		app.insertAdjacentElement('afterbegin', usersSetupPanel)
		usersSetupPanel.classList.remove('uk-hidden')
	}
}

function setupUserName(input) {
	return `<div class="uk-flex uk-flex-middle">
					<h3 id="user-name" class="uk-margin-remove">${input.value}</h3>
					<a class="uk-margin-left uk-text-small exit">Выход</a>
				</div>`
}
