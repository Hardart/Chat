import Avatar from './classes/Avatar.js'
import App from './classes/App.js'
import { sendFile, sendRequest } from './network/request.js'
const app = new App(chatApp, usersSettingsPanel, avatarInputPanel, selectAvatar)

selectAvatarInput.onchange = async function () {
	const data = new FormData()
	data.append('avatar', this.files[0])

	app.openAvatarConfig()
	const uploadedImage = await sendFile('post', '/test/avatarUpload', data)
	changeAvatar(uploadedImage)

	this.value = ''
}

function changeAvatar(image) {
	const valueElement = document.querySelector('.grabber')
	const avatarElement = document.querySelector('.image-enabled')
	const barFill = document.querySelector('.bar-fill')
	const avatarBorders = document.querySelector('.overlay-avatar')
	avatarElement.setAttribute('src', image.path.substring(6, image.path.length))

	const avatar = new Avatar(avatarElement, image, avatarBorders)
	avatar.path = image.path
	avatar.calcSize()

	valueElement.onmousedown = function (event) {
		let shiftX = event.clientX - valueElement.getBoundingClientRect().left

		function moveAt(pageX) {
			let moveLeft = pageX - shiftX - slider.getBoundingClientRect().left
			let moveLefInPercent = (moveLeft * 100) / slider.clientWidth

			if (moveLefInPercent < 0) {
				moveLefInPercent = moveLeft = 0
			}
			if (moveLefInPercent > 100) {
				moveLefInPercent = 100
				moveLeft = slider.clientWidth
			}

			avatar.scale = moveLeft / 2
			avatar.setPosition()
			avatar.setSize(moveLeft)

			valueElement.style.left = moveLefInPercent + '%'
			barFill.style.width = moveLefInPercent + '%'
			inputElement.setAttribute('value', Math.round(moveLefInPercent))
		}

		function onMouseMove(event) {
			moveAt(event.pageX)
		}

		function onMouseUp() {
			document.removeEventListener('mousemove', onMouseMove)
			document.removeEventListener('mouseup', onMouseUp)
		}

		// передвигаем мяч при событии mousemove
		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
	}

	avatarElement.onmousedown = function (event) {
		let shiftX = event.pageX - avatar.posX
		let shiftY = event.pageY - avatar.posY

		function moveAt(pageX, pageY) {
			avatar.posX = pageX - shiftX
			avatar.posY = pageY - shiftY

			avatar.setPosition()
		}

		function onMouseMove(event) {
			moveAt(event.pageX, event.pageY)
		}

		function onMouseUp() {
			document.removeEventListener('mousemove', onMouseMove)
			document.removeEventListener('mouseup', onMouseUp)
		}

		// передвигаем мяч при событии mousemove
		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
	}

	document.ondragstart = function () {
		return false
	}

	// кнопка Отправить аватар после коррекции пользователем
	if (setupAvatarBtn) {
		setupAvatarBtn.onclick = async function () {
			const oldPath = userAvatarBig.getAttribute('src')
			const body = { avatar: avatar, userId: userChatID.innerText }

			if (oldPath.match(/[^\/]+$/)[0] !== 'avatar.png') {
				body.oldPath = oldPath
			}

			const response = await sendRequest('post', '/test/avatarResize', body)
			userAvatarBig.setAttribute('src', response.path)
			userAvatarSmall.setAttribute('src', response.path)
			const imageList = [...messageList.querySelectorAll('img')]

			imageList.forEach((img) => {
				const path = img.getAttribute('src')
				if (path == oldPath) img.setAttribute('src', response.path)
			})
			app.closeAvatarConfig()
		}
	}

	// кнопка Отменить установку аватара
	if (cancelSetupAvatarBtn) {
		cancelSetupAvatarBtn.onclick = async function () {
			const oldPath = avatarElement.getAttribute('src')
			app.closeAvatarConfig(false)
			await sendRequest('post', '/test/avatarCancel', { path: oldPath })
		}
	}
}
