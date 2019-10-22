import Rescalor from './Rescalor.js'
import Schedule, { Subject } from './Schedule.js'
import Time from './Time.js'

//Set up clock and start time
(function () {
	const a = new Time();
	const clock = document.querySelector(".clock");
	clock.innerHTML = a.render()
	a.timeTick(500)
	clock.addEventListener("clockTick", () => {
		clock.innerHTML = a.render()
	})
});


//Add functionality to the computer and red-green bar
(function () {
	const computer = new Rescalor(1, 1.5, '.computer')
	const barLine = new Rescalor(1, 1.5, '.barLine')

	document.body.onkeyup = e => {
		computer.rescale(0.2)
		barLine.retranslate(-40)
	}
	setInterval(() => {
		computer.rescale(-0.1)
		barLine.retranslate(30)
	}, 300)
}());

//Set up Schedule
(function () {
	const bk = new Subject("Betygskunskap")
	const fr = new Subject("Freud 2b")

	const test = new Schedule([
		[bk, bk, fr, bk],
		[bk, bk],
		[bk, fr],
		[fr, bk],
		[bk, fr]
	])
	document.querySelector('.subjects').innerHTML = test.render()

}());
