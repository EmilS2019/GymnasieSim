import Rescalor from './Rescalor.js'
import Schedule, { Subject } from './Schedule.js'
import Time from './Time.js'

//Set up clock and start time
const time = new Time();
(function () {
	const clock = document.querySelector(".clock");
	clock.innerHTML = time.render()
	time.timeTick(50)
	clock.addEventListener("clockTick", () => {
		clock.innerHTML = time.render()
	})
}());


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

//Sets up the Schedule
(function () {
	const domSchedule = document.querySelector('.schedule')

	const bk = new Subject("Betygskunskap")
	const fr = new Subject("Freud 2b")
	const ln = new Subject("Lunch")

	//For example: [["hi", "hi2"], ["hi"]] would mean two on monday and one on Tuesday
	const schedule = new Schedule([
		[bk, bk, fr, bk, ln, fr, bk],
		[bk, bk],
		[bk, fr],
		[fr, bk],
		[bk, fr]
	])

	domSchedule.innerHTML = schedule.render()

	domSchedule.addEventListener("clockTick", () => {
		schedule.setCurrentSubject(time)
	})

}());
