import Visibility from './classes/Visibility.js'
import { sendRequest } from './network/request.js'
const panel = new Visibility()
// кнопки
const logoutButton = document.querySelector('.exit')
const setupButton = document.querySelector('.setup')
const usersToggleButton = document.querySelector('.users-panel-toggle')

usersToggleButton.onclick = () => {
	usersAsidePanel.classList.toggle('uk-hidden')
	if (usersAsidePanel.classList.contains('uk-hidden')) return usersAsidePanel.remove()
	chatApp.insertAdjacentElement('beforeend', usersAsidePanel)
}

if (logoutButton) {
	tapLogout(logoutButton)
	openSetting(setupButton)
}

if (closeButton) {
	closeSettings(closeButton)
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

function openSetting(btn) {
	btn.onclick = () => {
		panel.show(usersSettingsPanel, chatApp)
	}
}

function closeSettings(btn) {
	btn.onclick = () => {
		panel.hide(chatApp, usersSettingsPanel)
	}
}
