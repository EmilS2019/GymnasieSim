export default class Schedule {
	//Week is an array of arrays.
	//For example: [["hi", "hi2"], ["hi"]] would mean two on monday and one on Tuesday
	constructor(Week) {
		this.Week = Week
		this.Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	}

	setCurrentSubject({ Time }) {


		// console.log(Time)
	}

	render = () => {
		return `<div class="Schedule">
					${this.Week.map((day, i) => (`
					<div class="Schedule-Day">
						<h1>${this.Days[i]}</h1>

				${day
				.map((subject, i) => `<div>${subject.name}  
									${8 + i}:00-${8 + i}:50
									</div>
					`)

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
