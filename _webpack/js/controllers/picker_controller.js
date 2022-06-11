import { Controller } from "stimulus"
import Storage from "../storage"


export default class extends Controller {

  static classes = [
    "hidden",
  ]

  static targets = [
    "buttonName",
    "buttonIcon",
    "options",
    "picker",
  ]

  static values = {
    isOpen: Boolean
  }

  initialize() {
    this.storage = new Storage()
    this.changePalette()
  }

  savePalette(palette) {
    this.storage.setItem("palette", palette)
  }

  changePalette() {
    const palette = this.storage.getItem("palette")
    if (palette !== null) {
      const body = document.querySelector("body");
      body.className = "";
      body.classList.add(`palette-${palette.id}`)
      this.buttonNameTarget.innerText = palette.name
      this.buttonIconTarget.innerHTML = palette.icon
    }
  }

  changeThemeColors(event) {
    const palette = JSON.parse(event.currentTarget.dataset.pallete)
    this.savePalette(palette)
    this.changePalette()
    this.closeMenu()
  }

  openMenu() {
    this.isOpenValue = true
    this.optionsTarget.classList.remove(this.hiddenClass)
  }

  closeMenu() {
    this.isOpenValue = false
    this.optionsTarget.classList.add(this.hiddenClass)
  }

  toggleMenu(event) {
    if (!this.isOpenValue) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }
}
