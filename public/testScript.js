let inputElement = document.querySelector('input')
let slider = document.querySelector('.track')
let valueElement = document.querySelector('.grabber')

valueElement.onmousedown = function (event) {
	let shiftX = event.clientX - valueElement.getBoundingClientRect().left

	function moveAt(pageX) {
		let moveLeft = pageX - shiftX - slider.getBoundingClientRect().left

		if (moveLeft < 0) {
			valueElement.style.left = 0 + '%'
			inputElement.setAttribute('value', 0)
			return
		}
		if (moveLeft >= slider.clientWidth) {
			valueElement.style.left = 100 + '%'
			inputElement.setAttribute('value', 100)
			return
		}
		const moveLefInPercent = (moveLeft * 100) / slider.clientWidth
		valueElement.style.left = moveLefInPercent + '%'
		inputElement.setAttribute('value', Math.round(moveLefInPercent))
	}

	function onMouseMove(event) {
		moveAt(event.clientX)
	}

	// передвигаем мяч при событии mousemove
	document.addEventListener('mousemove', onMouseMove)

	document.onmouseup = function () {
		document.removeEventListener('mousemove', onMouseMove)
		document.onmouseup = null
	}
}

// valueElement.ondragstart = function () {
// 	console.log('drag')
// 	return false
// }
