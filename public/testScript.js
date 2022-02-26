const inputElement = document.querySelector('input')
const slider = document.querySelector('.track')
const valueElement = document.querySelector('.grabber')
const avatar = document.querySelector('.image-enabled')
const barFill = document.querySelector('.bar-fill')
const avatarBorders = document.querySelector('.overlay-avatar')

const avatarWidth = avatar.clientWidth
const avatarHeight = avatar.clientHeight

valueElement.onmousedown = function (event) {
	let shiftX = event.clientX - valueElement.getBoundingClientRect().left

	function moveAt(pageX) {
		let moveLeft = pageX - shiftX - slider.getBoundingClientRect().left
		// console.log(moveLeft)

		let moveLefInPercent = (moveLeft * 100) / slider.clientWidth
		if (moveLefInPercent < 0) {
			moveLefInPercent = moveLeft = 0
		}
		if (moveLefInPercent > 100) {
			moveLefInPercent = 100
			moveLeft = slider.clientWidth
		}

		avatar.style.width = avatarWidth + moveLeft
		avatar.style.minWidth = avatarWidth + moveLeft
		avatar.style.height = avatarHeight + moveLeft

		valueElement.style.left = moveLefInPercent + '%'
		barFill.style.width = moveLefInPercent + '%'
		inputElement.setAttribute('value', Math.round(moveLefInPercent))
	}

	function onMouseMove(event) {
		moveAt(event.clientX)
	}

	function onMouseUp() {
		document.removeEventListener('mousemove', onMouseMove)
		document.removeEventListener('mouseup', onMouseUp)
	}

	// передвигаем мяч при событии mousemove
	document.addEventListener('mousemove', onMouseMove)
	document.addEventListener('mouseup', onMouseUp)
}

let x = 0
let y = 0

avatar.onmousedown = function (event) {
	let shiftX = event.clientX - x
	let shiftY = event.clientY - y

	function moveAt(pageX, pageY) {
		avatar.style.transform = `translate3d(${pageX - shiftX}px, ${pageY - shiftY}px, 0px)`
		x = pageX - shiftX
		y = pageY - shiftY
		// console.log(moveH)
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

avatar.onclick = (e) => {
	let { x } = getTranslateValues(avatar)
	console.log(x)
	console.log('ClientX = ' + e.clientX)
	console.log('LayerX = ' + e.layerX)
}
document.ondragstart = function () {
	return false
}
