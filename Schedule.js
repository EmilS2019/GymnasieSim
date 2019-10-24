export default class Schedule {

	constructor(Week) {
		this.Week = Week
		this.currentSubject = document.createElement("div")
		this.currentSubject.setAttribute("id", "null")
		this.Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	}

	getSubjects() {
		const newSet = []
		this.Week.forEach(day => {
			day.forEach(subject => {
				if (!newSet.includes(subject)) newSet.push(subject)
			})
		});
		return newSet
	}

	setCurrentSubject(Time) {
		const date = Time.getTime()
		const hour = date.getHours() - 8
		const day = date.getDay()
		const subjectID = `${this.Days[day - 1]}-${this.formatTime(hour)}`

		if (this.currentSubject.id !== subjectID) {
			const subject = document.getElementById(subjectID)
			if (subject) {
				this.currentSubject.classList.toggle("currentSubject")
				this.currentSubject = subject
				this.currentSubject.id = subject.id
				subject.classList.toggle("currentSubject")
			}
			else { //if no subject found aka end of day or before
				this.currentSubject.classList.remove("currentSubject")
			}
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

	returnGrade() {
		const grades = ["F", "E", "D", "C", "B", "A"]
		return grades[this.grade]
	}
}
