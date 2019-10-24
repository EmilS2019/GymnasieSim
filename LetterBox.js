export default class LetterBox {

    constructor(letter, query) {
        if (!query) query = "body"
        if (!letter) letter = "please add word"

        this.letter = letter
        this.query = query
    }


    render() {
        const box = document.createElement("div")
        box.classList.add("letterBox")
        box.innerText = this.letter
        document.querySelector(this.query).appendChild(box)
    }

}