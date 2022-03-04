export default class Avatar {
	constructor(avatarElement, imageObj, borderElement) {
		this.avatarElement = avatarElement
		this.borderElement = borderElement
		this.path = String()
		this.w = imageObj.width
		this.h = imageObj.height
		this.newW = 0
		this.newH = 0
		this.posX = 0
		this.posY = 0
		this.scale = 0
		this.diff = 0
		this.borderWidth
	}

	calcRatio() {
		if (this.w > this.h) return this.w / this.h
		if (this.h > this.w) return this.h / this.w
		return 1
	}

	calcSize() {
		if (this.h > 380) {
			this.newH = this.newW = 380
			if (this.isHorisontalAspect) this.newW = 380 * this.ratio
			if (!this.isHorisontalAspect) this.newW = 380 / this.ratio
			this.h = this.newH
			this.w = this.newW
		}

		const borderSize = this.w >= this.h ? this.h : this.w
		this.diff = this.w > this.h ? (this.w - this.h) / 2 : (this.h - this.w) / 2
		this.borderElement.style.height = this.borderElement.style.width = this.borderWidth = borderSize
		this.setSize()
	}

	setSize(offset = 0) {
		if (this.isHorisontalAspect) {
			this.avatarElement.style.width = this.newW = this.w + offset
			this.avatarElement.style.minWidth = this.w + offset
			this.avatarElement.style.height = this.newH = (this.w + offset) / this.ratio
		} else {
			this.avatarElement.style.width = this.newW = (this.h + offset) / this.ratio
			this.avatarElement.style.minWidth = (this.h + offset) / this.ratio
			this.avatarElement.style.height = this.newH = this.h + offset
		}
	}

	refreshSize() {
		this.avatarElement.style.transform = `translate3d(${0}px, ${0}px, 0px)`
	}

	setPosition() {
		if (this.isHorisontalAspect) {
			if (this.scale <= this.posX - this.diff) {
				this.posX = this.scale + this.diff
			}
			if (this.scale * -1 >= this.posX + this.diff) {
				this.posX = this.scale * -1 - this.diff
			}

			if (this.scale / this.ratio <= this.posY) {
				this.posY = this.scale / this.ratio
			}
			if ((this.scale * -1) / this.ratio >= this.posY) {
				this.posY = (this.scale * -1) / this.ratio
			}
		} else {
			if (this.scale / this.ratio <= this.posX) {
				this.posX = this.scale / this.ratio
			}
			if ((this.scale * -1) / this.ratio >= this.posX) {
				this.posX = (this.scale * -1) / this.ratio
			}

			if (this.scale <= this.posY - this.diff) {
				this.posY = this.scale + this.diff
			}
			if (this.scale * -1 >= this.posY + this.diff) {
				this.posY = this.scale * -1 - this.diff
			}
		}

		this.avatarElement.style.transform = `translate3d(${Math.round(this.posX)}px, ${Math.round(this.posY)}px, 0px)`
	}

	get ratio() {
		return this.calcRatio()
	}

	get isHorisontalAspect() {
		if (this.w >= this.h) return true
		return false
	}
}
