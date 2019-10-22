export default class Rescalor {
	constructor(min, max, id) {
		this.min = min
		this.max = max
		this.scale = 1
		this.computer = document.querySelector(id)
		this.translate = 100
	}

	rescale(change) {
		const newScale = this.scale + change
		if (newScale <= this.max && newScale >= this.min) {
			this.scale = newScale
			this.computer.style.transform = `scale(${newScale})`
		}
	}

	retranslate(change) {
		const newTrans = this.translate + change
		if (newTrans <= 350 && newTrans >= 0) {
			this.translate = newTrans
			this.computer.style.transform = `translateY(${newTrans}px)`
		}
	}
}
