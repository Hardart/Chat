import Avatar from './elements/Avatar.js'
import { sendFile, sendRequest } from './elements/request.js'

selectAvatarInput.onchange = async function () {
	app.insertAdjacentElement('afterbegin', selectAvatar)
	// console.log(this)
	const data = new FormData()
	data.append('avatar', this.files[0])

	uploadAvatar.style.opacity = 0
	uploadAvatar.style.transform = `scale(0.4)`
	selectAvatar.style.transform = `scale(1.7)`
	setTimeout(() => {
		selectAvatar.style.opacity = 1
		selectAvatar.style.transform = `scale(1)`
	}, 0)

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
			const oldPath = userAvatarImage.getAttribute('src')
			const body = { avatar: avatar }
			if (oldPath.match(/[^\/]+$/)[0] !== 'avatar.png') {
				// console.log(oldPath.match(/[^\/]+$/))
				body.oldPath = oldPath
			}
			const response = await sendRequest('post', '/test/avatarResize', body)
			userAvatarImage.setAttribute('src', response.path)
			animateSetupOpacity(uploadAvatar, selectAvatar, avatar)
		}
	}

	// кнопка Отменить установку аватара
	if (cancelSetupAvatarBtn) {
		cancelSetupAvatarBtn.onclick = async function () {
			const oldPath = avatarElement.getAttribute('src')

			await sendRequest('post', '/test/avatarCancel', { path: oldPath })
			animateSetupOpacity(uploadAvatar, selectAvatar, avatar)
		}
	}
}

function animateSetupOpacity(formUpload, selectAvatarPanel, avatarInstance) {
	formUpload.style.scale = 1
	formUpload.style.opacity = 1
	formUpload.style.transform = `scale(1)`
	selectAvatarPanel.style.opacity = 0
	selectAvatarPanel.style.transform = `scale(1.7)`
	avatarInstance.refreshSize()
	setTimeout(() => {
		selectAvatarPanel.remove()
	}, 400)
}
