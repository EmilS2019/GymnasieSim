import Rescalor from './Rescalor.js'
import Schedule, { Subject } from './Schedule.js'
import Time from './Time.js'
import LetterBox from './LetterBox.js'

//Set up clock and start time
const time = new Time();
(function () {
	const clock = document.querySelector(".clock");
	clock.innerHTML = time.render()
	time.timeTick(100)
	clock.addEventListener("clockTick", () => {
		clock.innerHTML = time.render()
	})
}());


//Add functionality to the computer and red-green bar
(function () {
	const computer = new Rescalor(1, 1.5, '.computer')
	const barLine = new Rescalor(1, 1.5, '.barLine')
	const bar = new Rescalor(1, 1.3, '.bar')

	document.body.onkeyup = e => {
		computer.rescale(0.2)
		barLine.retranslate(-5)
		bar.rescale(0.01)
		const lett = new LetterBox(e.key, ".letterBoxes")
		lett.render()
	}
	setInterval(() => {
		computer.rescale(-0.1)
		bar.rescale(-0.04)
		barLine.retranslate(10)
	}, 300)
}());

//Sets up the Schedule

(function () {
	const domSchedule = document.querySelector('.schedule')

	var bk = new Subject("Betygskunskap")
	var fr = new Subject("Freud 2b")
	var ln = new Subject("Lunch");

	//For example: [["hi", "hi2"], ["hi"]] would mean two on monday and one on Tuesday
	var schedule = new Schedule([
		[bk, fr, bk],
		[bk, bk, bk, fr, bk, ln, fr, bk],
		[bk, fr],
		[fr, bk],
		[bk, fr]
	])

	domSchedule.innerHTML = schedule.render()

	domSchedule.addEventListener("clockTick", () => {
		schedule.setCurrentSubject(time)
	})

}());

//Adds the grading list
(function () {
	const renderGradeList = (bk, fr) => {
		const gradeList = document.querySelector(".gradeList")
		gradeList.innerHTML = `
		<p>${bk.name}: ${bk.returnGrade()}</p>
		<p>${fr.name}: ${fr.returnGrade()}</p>`
	}

	renderGradeList(bk, fr)

	//Grabs the current subject and compares it to the list of subjects
	//If it's found, then if the player clicks spacebar, do stuff
	const subjects = schedule.getSubjects()
	document.body.onkeydown = e => {
		const currentSub = schedule.currentSubject.innerText.split(/\s\d{1,2}:/)[0]
		subjects.forEach(subject => {
			if (subject.name === currentSub) {
				subject.changeGradeXP(1)
			}
		})
		renderGradeList(bk, fr)
	}
}());



