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

let offsetX = 0
let offsetY = 0
avatar.onmousedown = function (event) {
	let shiftX = event.clientX - offsetX
	let shiftY = event.clientY - offsetY

	const avatarWidth = avatar.getBoundingClientRect().width

	const borderRight = avatarBorders.getBoundingClientRect().right
	function moveAt(pageX, pageY) {
		const avatarLeft = avatar.getBoundingClientRect().left
		const borderLeft = avatarBorders.getBoundingClientRect().left
		let posX = offsetX
		let posY = pageY - shiftY
		if (borderLeft - avatarLeft > 0) {
			posX = pageX - shiftX
		}

		avatar.style.transform = `translate3d(${posX}px, ${posY}px, 0px)`
		offsetX = posX
		offsetY = posY
		console.log()
		// console.log(borderLeft, borderRight)
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

// avatar.onclick = (e) => {
// 	const avatarLeft = avatar.getBoundingClientRect().left
// 	const borderLeft = avatarBorders.getBoundingClientRect().left
// 	console.log(avatarLeft, borderLeft)
// 	if (avatarLeft <= borderLeft) console.log(true)
// 	console.log(false)
// 	// console.log('ClientX = ' + e.clientX)
// 	// console.log('LayerX = ' + e.layerX)
// }
document.ondragstart = function () {
	return false
}

function getTranslateValues(element) {
	const style = window.getComputedStyle(element)
	const matrix = style['transform'] || style.webkitTransform || style.mozTransform

	// No transform property. Simply return 0 values.
	if (matrix === 'none' || typeof matrix === 'undefined') {
		return {
			x: 0,
			y: 0,
			z: 0,
		}
	}

	// Can either be 2d or 3d transform
	const matrixType = matrix.includes('3d') ? '3d' : '2d'
	const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

	// 2d matrices have 6 values
	// Last 2 values are X and Y.
	// 2d matrices does not have Z value.
	if (matrixType === '2d') {
		return {
			x: matrixValues[4],
			y: matrixValues[5],
			z: 0,
		}
	}

	// 3d matrices have 16 values
	// The 13th, 14th, and 15th values are X, Y, and Z
	if (matrixType === '3d') {
		return {
			x: matrixValues[12],
			y: matrixValues[13],
			z: matrixValues[14],
		}
	}
}
