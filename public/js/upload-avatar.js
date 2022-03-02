import { Avatar } from './elements/Avatar.js'

uploadAvatar.onsubmit = async function (e) {
	e.preventDefault()
	const input = document.querySelector('input')
	blockAvatar.insertAdjacentElement('beforeend', selectAvatar)
	// selectAvatar.classList.remove('uk-hidden')
	const data = new FormData()
	data.append('avatar', input.files[0])
	this.style.scale = 0.4
	this.style.opacity = 0
	selectAvatar.style.transform = `scale(1.7)`
	setTimeout(() => {
		selectAvatar.style.opacity = 1
		selectAvatar.style.scale = 1
		selectAvatar.style.transform = `scale(1)`
	}, 0)

	const uploadedImage = await sendFile('post', '/test', data)

	// console.log(input.files)
	changeAvatar(uploadedImage)
}

function changeAvatar(image) {
	const valueElement = document.querySelector('.grabber')
	const avatarElement = document.querySelector('.image-enabled')
	const barFill = document.querySelector('.bar-fill')
	const avatarBorders = document.querySelector('.overlay-avatar')
	avatarElement.setAttribute('src', image.path.substring(6, image.path.length))

	const avatar = new Avatar(avatarElement, image, avatarBorders)
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
}
