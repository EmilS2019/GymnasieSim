export default class Schedule {

	constructor(Week) {
		this.Week = Week
		this.Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	}

	setCurrentSubject(Time) {
		const date = Time.getTime()
		const hour = date.getHours() - 8
		const day = date.getDay()
		const subjectID = `${this.Days[day - 1]}-${this.formatTime(hour)}`

		if (this.currentSubject && this.currentSubject.id !== subjectID) {
			try {
				const subject = document.getElementById(subjectID)
				this.currentSubject = subject
				subject.classList.toggle("currentSubject")

			} catch (e) { null } //It only errors if there are no lessions at that time
		}
		else if (this.currentSubject === undefined) {
			this.currentSubject = document.getElementById(subjectID)
		}
	}

	formatTime = (j) => (`${8 + j}:00-${8 + j}:50`)

	render() {
		return `<div class="Schedule">
					${this.Week.map((day, i) => (`
					<div class="Schedule-Day" id="${this.Days[i]}">
						<h1>${this.Days[i]}</h1>

				${day.map((subject, j) => `<div id="${this.Days[i]}-${this.formatTime(j)}" value="hiii:-">  
									${subject.name}
									${this.formatTime(j)}
									</div>`)

				.join('')}						
				</div>	`)).join('')}				
                </div>`
	}
}

export class Subject {
	constructor(name) {
		this.name = name
		//Do NOT set grade directly
		this.grade = 0
	}

	setGrade(change) {
		let newGrade = this.grade + change

		if (newGrade === 0) {
			console.warn("Grade can't be lowered")
		}
		if (newGrade === 6) {
			console.warn("Grade can't be increased")
		}
		else {
			this.grade = newGrade
		}
	}
}
