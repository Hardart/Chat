import App from './classes/App.js'
import ToggleActiveClass from './classes/Element.js'
const settingsListItems = [
	{ id: '1', title: 'account', selector: '.my-acc' },
	{ id: '2', title: 'history', selector: '.my-acc' },
	{ id: '3', title: 'account', selector: '.my-acc' },
	{ id: '4', title: 'account', selector: '.my-acc' },
	{ id: '5', title: 'account', selector: '.my-acc' },
	{ id: '6', title: 'account', selector: '.my-acc' },
	{ id: '7', title: 'account', selector: '.my-acc' },
	{ id: '8', title: 'account', selector: '.my-acc' },
	{ id: '9', title: 'account', selector: '.my-acc' },
	{ id: '10', title: 'account', selector: '.my-acc' },
]

import { sendRequest } from './network/request.js'

const app = new App(chatApp, usersSettingsPanel, avatarInputPanel, selectAvatar)
const settings = new ToggleActiveClass('.user-setup-list li', settingsListItems)

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
		settings.selectMenuItem()
		// settingsListItemClick()
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
	if (e.target != selectAvatarInput) return app.hideInput()
}

