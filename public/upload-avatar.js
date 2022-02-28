uploadAvatar.onsubmit = async function (e) {
	e.preventDefault()
	const input = document.querySelector('input')
	blockAvatar.insertAdjacentElement('beforeend', selectAvatar)
	// selectAvatar.classList.remove('uk-hidden')
	const data = new FormData()
	data.append('avatar', input.files[0])
	this.style.scale = 0.4
	this.style.opacity = 0
	setTimeout(() => {
		selectAvatar.style.opacity = 1
		selectAvatar.style.scale = 1
	}, 0)

	const uploadedImage = await sendFile('post', '/test', data)

	// console.log(input.files)
	changeAvatar(uploadedImage)
}

function changeAvatar(image) {
	const valueElement = document.querySelector('.grabber')
	const avatar = document.querySelector('.image-enabled')
	const barFill = document.querySelector('.bar-fill')
	const avatarBorders = document.querySelector('.overlay-avatar')
	avatar.setAttribute('src', image.path.substring(6, image.path.length))

	const { w, h, diffX, diffY } = getSizeOfImage(image, avatar, avatarBorders)

	let posX = 0
	let posY = 0
	let imageScale = 0
	avatar.style.width = w
	avatar.style.minWidth = w
	avatar.style.height = h

	valueElement.onmousedown = function (event) {
		let shiftX = event.clientX - valueElement.getBoundingClientRect().left

		function moveAt(pageX) {
			const { x, y } = getTranslateValues(avatar)

			let moveLeft = pageX - shiftX - slider.getBoundingClientRect().left
			let moveLefInPercent = (moveLeft * 100) / slider.clientWidth

			if (moveLefInPercent < 0) {
				moveLefInPercent = moveLeft = 0
			}
			if (moveLefInPercent > 100) {
				moveLefInPercent = 100
				moveLeft = slider.clientWidth
			}

			imageScale = moveLeft / 2

			if (imageScale < x - diffX) {
				posX = imageScale + diffX
			}
			if (imageScale * -1 > x + diffX) {
				posX = imageScale * -1 - diffX
			}

			if (imageScale < y - diffY) {
				posY = imageScale + diffY
			}
			if (imageScale * -1 > y + diffY) {
				console.log(diffY)
				posY = imageScale * -1 - diffY
			}

			avatar.style.width = w + moveLeft
			avatar.style.minWidth = w + moveLeft
			avatar.style.height = h + moveLeft

			valueElement.style.left = moveLefInPercent + '%'
			barFill.style.width = moveLefInPercent + '%'
			inputElement.setAttribute('value', Math.round(moveLefInPercent))
			avatar.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
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

	avatar.onmousedown = function (event) {
		let shiftX = event.pageX - posX
		let shiftY = event.pageY - posY

		function moveAt(pageX, pageY) {
			posX = pageX - shiftX
			posY = pageY - shiftY

			if (imageScale <= posX - diffX) {
				posX = imageScale + diffX
			}

			if (imageScale * -1 >= posX + diffX) {
				posX = imageScale * -1 - diffX
			}

			if (imageScale <= posY - diffY) {
				posY = imageScale + diffY
			}

			if (imageScale * -1 >= posY + diffY) {
				posY = imageScale * -1 - diffY
			}

			avatar.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
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

function getSizeOfImage(image, avatar, border) {
	let w = image.width
	let h = image.height
	let diffX = 0
	let diffY = 0
	const n = w >= h ? w : h

	switch (true) {
		case n > 1800:
			h /= 4
			w /= 4
			break
		case n > 500:
			h /= 2
			w /= 2
			break
	}

	border.style.height = border.style.width = w
	if (w < h) {
		diffY = (h - w) / 2
	}
	if (w > h) {
		diffX = (w - h) / 2
		border.style.height = border.style.width = h
	}

	return { w, h, diffX, diffY }
}
