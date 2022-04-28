import Avatar from '../classes/Avatar.js'
import {
	inputElement,
	selectAvatarInput,
	setupAvatarBtn,
	cancelSetupAvatarBtn,
	userAvatarBig,
	userAvatarSmall,
	userChatID,
	messageList,
} from '../globalVariables.js'
export default async function (app, api) {
	const data = new FormData()
	data.append('avatar', selectAvatarInput.files[0])

	app.openAvatarConfig()
	try {
		const uploadedImage = await api.sendFile('post', '/avatar/upload', data)
		changeAvatar(uploadedImage, app, api)
	} catch (error) {
		console.log(error)
	}

	selectAvatarInput.value = ''
}

function changeAvatar(image, app, api) {
	const slider = document.querySelector('.track')
	const sliderGrabber = document.querySelector('.grabber')
	const uploadedAvatar = document.querySelector('.image-enabled')
	const sliderBarFill = document.querySelector('.bar-fill')
	const avatarBorders = document.querySelector('.overlay-avatar')

	uploadedAvatar.setAttribute('src', image.path.substring(6, image.path.length))
	const avatar = new Avatar(uploadedAvatar, image, avatarBorders)

	avatar.path = image.path
	avatar.calcSize()

	sliderGrabber.onmousedown = function (event) {
		let shiftX = event.clientX - sliderGrabber.getBoundingClientRect().left

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

			sliderGrabber.style.left = moveLefInPercent + '%'
			sliderBarFill.style.width = moveLefInPercent + '%'
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

	uploadedAvatar.onmousedown = function (event) {
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
	pressSendButton(avatar, app, api, uploadedAvatar, sliderGrabber, sliderBarFill)

	// кнопка Отменить на установку аватара
	pressCancelButton(uploadedAvatar, app, api, sliderGrabber, sliderBarFill)
}

function pressSendButton(imageClass, app, api, uploadedImage, sliderGrabber, sliderBarFill) {
	if (setupAvatarBtn) {
		setupAvatarBtn.onclick = async function () {
			const oldPath = userAvatarBig.getAttribute('src')
			const body = { avatar: imageClass, userId: userChatID.innerText, btn: 'Send' }

			if (oldPath.match(/[^\/]+$/)[0] !== 'avatar.png') {
				body.oldPath = oldPath
			}

			try {
				const response = await api.sendRequest('post', '/avatar/resize', body)
				const oldImage = [...document.querySelectorAll('.users-online img')]
				const imageList = [...messageList.querySelectorAll('img')]
				userAvatarBig.setAttribute('src', response.path)
				userAvatarSmall.setAttribute('src', response.path)
				oldImage.forEach((img) => {
					const path = img.getAttribute('src')
					if (path == oldPath) img.setAttribute('src', response.path)
				})

				imageList.forEach((img) => {
					const path = img.getAttribute('src')
					if (path == oldPath) img.setAttribute('src', response.path)
				})
				app.closeAvatarConfig()
				
			} catch (error) {
				console.log(error)
			}
		}
	}
	resetAvatarSize(uploadedImage, sliderGrabber, sliderBarFill)
}

function pressCancelButton(uploadedImage, app, api, sliderGrabber, sliderBarFill) {
	if (cancelSetupAvatarBtn) {
		cancelSetupAvatarBtn.onclick = async function () {
			const oldPath = uploadedImage.getAttribute('src')
			app.closeAvatarConfig(false)
			await api.sendRequest('post', '/avatar/cancel', { path: oldPath, btn: 'cancel' })
			resetAvatarSize(uploadedImage, sliderGrabber, sliderBarFill)
		}
	}
}

function resetAvatarSize(uploadedImage, sliderGrabber, sliderBarFill) {
	sliderGrabber.removeAttribute('style')
	sliderBarFill.style.width = '0%'
	uploadedImage.style.transform = 'translate3d(0px, 0px, 0px)'
}
