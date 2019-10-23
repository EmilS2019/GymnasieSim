export default class Time {
    constructor() {
        const newDate = new Date()
        newDate.setFullYear(2019, 7, 19)
        newDate.setHours(7)
        newDate.setMinutes(10)
        newDate.setSeconds(0)
        this.Time = newDate
    }

    getTime() {
        return this.Time
    }

    render() {
        const mins = this.Time.getMinutes()
        return `
        ${this.Time.getHours()}:${mins < 10 ? "0" + mins : mins}
        `
    }

    timeTick(delay) {
        const clock = document.querySelector(".clock")
        const schedule = document.querySelector(".schedule")
        const event = new Event("clockTick", {
            time: this.Time
        })

        setInterval(() => {
            this.Time.setMinutes(this.Time.getMinutes() + 1)
            clock.dispatchEvent(event)
            schedule.dispatchEvent(event)
        }, delay);
    }
}