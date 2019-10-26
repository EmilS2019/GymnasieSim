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
		console.log(schedule.currentSubject.id)
		console.log(document.createElement("div").id)
		if (schedule.currentSubject.id !== document.createElement("div").id
			|| schedule.currentSubject.id.split(/\s\d{1,2}:/)[1] === "12:00-12:50") {
			computer.rescale(0.2)
			barLine.retranslate(-5)
			bar.rescale(0.01)
			const lett = new LetterBox(e.key, ".letterBoxes")
			lett.render()
		}
	}
	setInterval(() => {
		computer.rescale(-0.1)
		bar.rescale(-0.04)
		barLine.retranslate(10)
	}, 300)
}());

//Sets up the Schedule
const bk = new Subject("Betygskunskap")
const fr = new Subject("Freud 2b")
const vo = new Subject("Viljanologi 1")
const ma = new Subject("Mattematik 8c")
const sm = new Subject("Smör")
const mo = new Subject("Mobil Surfande 2b")
const sc = new Subject("Schematik 2")

const ln = new Subject("Lunch")

//For example: [["hi", "hi2"], ["hi"]] would mean two on monday and one on Tuesday
const schedule = new Schedule([
	[bk, bk, vo, vo, ln, ma, ma, sm],
	[bk, bk, sm, ma, ln, mo, fr, sm],
	[sc, mo, sm, fr, ln, bk, sm, bk],
	[mo, ma, sm, fr, ln, sc, sc, mo],
	[sm, sm, mo, fr, ln, bk, fr, ma],
]);

(function () {
	const domSchedule = document.querySelector('.schedule')




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
		<p>${fr.name}: ${fr.returnGrade()}</p>
		<p>${vo.name}: ${vo.returnGrade()}</p>
		<p>${ma.name}: ${ma.returnGrade()}</p>
		<p>${sm.name}: ${sm.returnGrade()}</p>
		<p>${mo.name}: ${mo.returnGrade()}</p>
		<p>${sc.name}: ${sc.returnGrade()}</p>`
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



