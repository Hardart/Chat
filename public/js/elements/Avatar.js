export default class Avatar {
	constructor(avatarElement, imageObj, borderElement) {
		this.avatarElement = avatarElement
		this.borderElement = borderElement
		this.w = imageObj.width
		this.h = imageObj.height
		this.posX = 0
		this.posY = 0
		this.scale = 0
		this.diff = 0
	}

	calcRatio() {
		if (this.w > this.h) return this.w / this.h
		if (this.h > this.w) return this.h / this.w
		return 1
	}

	calcSize() {
		const n = this.w >= this.h ? this.w : this.h

		switch (true) {
			case n > 1800:
				this.h /= 5
				this.w /= 5
				break
			case n > 500:
				this.h /= 2
				this.w /= 2
				break
		}
		const borderSize = this.w >= this.h ? this.h : this.w
		this.diff = this.w > this.h ? (this.w - this.h) / 2 : (this.h - this.w) / 2
		this.borderElement.style.height = this.borderElement.style.width = borderSize
		this.setSize()
	}

	setSize(offset = 0) {
		if (this.isHorisontalRatio) {
			this.avatarElement.style.width = this.w + offset
			this.avatarElement.style.minWidth = this.w + offset
			this.avatarElement.style.height = (this.w + offset) / this.ratio
		} else {
			console.log(this.isHorisontalRatio)
			this.avatarElement.style.width = (this.h + offset) / this.ratio
			this.avatarElement.style.minWidth = (this.h + offset) / this.ratio
			this.avatarElement.style.height = this.h + offset
		}
	}

	setPosition() {
		if (this.isHorisontalRatio) {
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

		this.avatarElement.style.transform = `translate3d(${this.posX}px, ${this.posY}px, 0px)`
	}

	get ratio() {
		return this.calcRatio()
	}

	get isHorisontalRatio() {
		if (this.w >= this.h) return true
		return false
	}
}
