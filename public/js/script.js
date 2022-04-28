import App from './classes/App.js'
import { chatApp, usersAsidePanel, usersSettingsPanel, avatarInputPanel, selectAvatar, selectAvatarInput } from './globalVariables.js'
import ToggleActiveClass from './classes/ToggleClasses.js'
import api from './network/request.js'
import changeAvatar from './components/changeAvatar.js'
import { socket } from './socket.js'
const app = new App(chatApp, usersSettingsPanel, avatarInputPanel, selectAvatar)
const settings = new ToggleActiveClass('.user-setup-list li')
const userCard = new ToggleActiveClass('.users-online', chatApp)

selectAvatarInput.onchange = function () {
	changeAvatar(app, api)
}
const usersToggleButton = document.querySelector('.users-panel-toggle')

// кнопки в панели выбора аватара
const setupButton = usersAsidePanel.querySelector('.setup')
const logoutButton = usersAsidePanel.querySelector('.exit')

userCard.selectUserOnline()

usersToggleButton.onclick = () => {
	usersAsidePanel.classList.toggle('uk-hidden')
	if (usersAsidePanel.classList.contains('uk-hidden')) return usersAsidePanel.remove()
	chatApp.insertAdjacentElement('beforeend', usersAsidePanel)
}

tapLogout(logoutButton)
openSetting(setupButton)

function tapLogout(btn) {
	btn.onclick = () => {
		socket.emit('logout')
		api.sendRequest('post', '/logout').then((res) => {
			if (res.callback == 'ok') {
				window.location = './'
			}
		})
	}
}

function openSetting(btn) {
	btn.onclick = () => {
		app.openSettings()
		settings.selectMenuItem()
		showInputForAvatarSelect()
		closeSettings()
	}
}

function closeSettings() {
	const closeButton = document.querySelector('[uk-close]')
	closeButton.onclick = () => {
		app.closeSettings()
	}
}

function showInputForAvatarSelect() {
	const changeAvatarButton = document.getElementById('change-avatar')
	changeAvatarButton.onclick = () => {
		app.showInput()
	}
}

avatarInputPanel.onclick = (e) => {
	if (e.target != selectAvatarInput) return app.hideInput()
}
