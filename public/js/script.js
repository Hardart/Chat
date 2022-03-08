import App from './classes/App.js'
import { sendRequest } from './network/request.js'
const app = new App(chatApp, usersSettingsPanel, avatarInputPanel, selectAvatar)
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
	showInputForAvatarSelect()
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
		app.openSettings()
	}
}

function closeSettings(btn) {
	btn.onclick = () => {
		app.closeSettings()
	}
}

function showInputForAvatarSelect() {
	changeAvatarButton.onclick = () => {
		app.showInput()
	}
}

avatarInputPanel.onclick = (e) => {
	app.hideInput()
}
