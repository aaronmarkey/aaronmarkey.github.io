import { Controller } from "stimulus"
import fonts from "../fonts"
import utils from "../utils"

export default class extends Controller {

  static targets = [
    "byline",
    "title"
  ]

  static values = {
    authorNames: Object
  }

  initialize() {
    this.setRandomByline()
    this.setRandomTitleFonts()
  }

  setRandomByline() {
    const first = this.authorNamesValue.first[
      utils.randomInt(0, this.authorNamesValue.first.length - 1)
    ]
    const last = this.authorNamesValue.last[
      utils.randomInt(0, this.authorNamesValue.last.length - 1)
    ]
    this.bylineTarget.innerText = `${first} ${last}`
  }

  setRandomTitleFonts() {
    const titleCharacters = this.titleTarget.dataset.title.split("")

    let links = []
    let newTitle = ""

    titleCharacters.forEach(char => {
      const font = fonts.getRandomFont("nameplate")
      links.push(fonts.elementForFont(font, char))

      const span = document.createElement("span")
      span.style = `font-family: ${font};`
      span.innerHTML = char
      newTitle += span.outerHTML
    })
    links.forEach(link => {
      document.head.appendChild(link)
    })
    this.titleTarget.innerHTML = newTitle
  }
}