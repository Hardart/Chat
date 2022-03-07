export default class App {
	constructor() {
		this.scale = `scale(1) translateZ(0px)`
		this.maxScale = `scale(1.3)`
		this.minScale = `scale(0.93) translateZ(0px)`
		this.timeout = 100
		this.hidden = 0
		this.shown = 1
	}
	show(elementToShow, elementToHide) {
		elementToHide.insertAdjacentElement('beforebegin', elementToShow)
		if (elementToShow.classList.contains('uk-hidden')) {
			elementToShow.classList.remove('uk-hidden')
		}
		setTimeout(() => {
			elementToHide.style.opacity = this.hidden
			elementToHide.style.transform = this.minScale
		}, 0)
		setTimeout(() => {
			elementToShow.style.opacity = this.shown
			elementToShow.style.transform = this.scale
			elementToHide.remove()
		}, this.timeout)
	}

	hide(elementToShow, elementToHide) {
		elementToHide.insertAdjacentElement('afterend', elementToShow)
		setTimeout(() => {
			elementToShow.style.opacity = this.shown
			elementToShow.style.transform = this.scale
			elementToHide.style.opacity = this.hidden
			elementToHide.style.transform = this.maxScale
		}, 0)
		setTimeout(() => {
			elementToHide.classList.add('uk-hidden')
			elementToHide.remove()
		}, this.timeout)
	}
}
