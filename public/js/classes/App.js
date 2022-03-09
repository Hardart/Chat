export default class App {
	constructor(mainWindow, settings, inputAvatar, changeAvatar) {
		this.mainWindow = mainWindow
		this.settings = settings
		this.inputAvatar = inputAvatar
		this.changeAvatar = changeAvatar

		this.defaultScale = `scale(1) translateZ(0px)`
		this.maxScale = `scale(1.3) translateZ(0px)`
		this.minScale = `scale(0.93) translateZ(0px)`
		this.zeroScale = `scale(0) translateZ(0px)`
		this.timeout = 100
		this.hidden = 0
		this.shown = 1
	}

	// show(elementToShow, elementToHide) {
	// 	elementToHide.insertAdjacentElement('beforebegin', elementToShow)
	// 	if (elementToShow.classList.contains('uk-hidden')) {
	// 		elementToShow.classList.remove('uk-hidden')
	// 	}
	// 	setTimeout(() => {
	// 		elementToHide.style.opacity = this.hidden
	// 		elementToHide.style.transform = this.minScale
	// 	}, 0)
	// 	setTimeout(() => {
	// 		elementToShow.style.opacity = this.shown
	// 		elementToShow.style.transform = this.defaultScale
	// 		elementToHide.remove()
	// 	}, this.timeout)
	// }

	// hide(elementToShow, elementToHide) {
	// 	elementToHide.insertAdjacentElement('afterend', elementToShow)
	// 	setTimeout(() => {
	// 		elementToShow.style.opacity = this.shown
	// 		elementToShow.style.transform = this.defaultScale
	// 		elementToHide.style.opacity = this.hidden
	// 		elementToHide.style.transform = this.maxScale
	// 	}, 0)
	// 	setTimeout(() => {
	// 		elementToHide.classList.add('uk-hidden')
	// 		elementToHide.remove()
	// 	}, this.timeout)
	// }

	openSettings() {
		this.mainWindow.insertAdjacentElement('beforebegin', this.settings)
		this.settings.classList.remove('uk-hidden')
		setTimeout(() => {
			this.mainWindow.style.opacity = this.hidden
			this.mainWindow.style.transform = this.minScale
		}, 0)
		setTimeout(() => {
			this.settings.style.opacity = this.shown
			this.settings.style.transform = this.defaultScale
			// elementToHide.remove()
		}, this.timeout)
	}

	closeSettings() {
		setTimeout(() => {
			this.settings.style.opacity = this.hidden
			this.settings.style.transform = this.maxScale
		}, 0)
		setTimeout(() => {
			this.mainWindow.style.opacity = this.shown
			this.mainWindow.style.transform = this.defaultScale
			this.settings.classList.add('uk-hidden')
			this.settings.remove()
		}, this.timeout)
	}

	openAvatarConfig() {
		this.inputAvatar.insertAdjacentElement('afterend', this.changeAvatar)
		this.changeAvatar.classList.remove('uk-hidden')

		this.inputAvatar.style.opacity = this.hidden
		this.inputAvatar.style.transform = this.minScale
		this.changeAvatar.style.opacity = this.hidden
		this.changeAvatar.style.transform = this.minScale
		setTimeout(() => {
			this.changeAvatar.style.transform = this.defaultScale
			this.changeAvatar.style.opacity = this.shown
		}, 500)
	}

	closeAvatarConfig(closeAll = true) {
		this.changeAvatar.style.opacity = this.hidden
		this.changeAvatar.style.transform = this.minScale
		closeAll ? this.hideInput() : this.showInput()
		setTimeout(() => {
			this.changeAvatar.remove()
		}, this.timeout)
	}

	showInput() {
		this.inputAvatar.previousElementSibling.classList.remove('uk-hidden')

		setTimeout(() => {
			this.inputAvatar.previousElementSibling.style.opacity = this.shown
			this.inputAvatar.style.transform = this.defaultScale
			this.inputAvatar.style.opacity = this.shown
		}, this.timeout)
	}

	hideInput() {
		this.inputAvatar.previousElementSibling.style.opacity = this.hidden
		this.inputAvatar.style.transform = this.zeroScale
		setTimeout(() => {
			this.inputAvatar.previousElementSibling.classList.add('uk-hidden')
		}, this.timeout)
	}
}
