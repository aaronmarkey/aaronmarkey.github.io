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

  savePalette(palette, name) {
    console.log(palette, name)
    this.storage.setItem("palette", {palette, name})
  }

  changePalette() {
    const palette = this.storage.getItem("palette")
    if (palette !== null) {
      const body = document.querySelector("body");
      body.className = "";
      body.classList.add(`palette-${palette.palette}`)
      this.buttonNameTarget.innerText = palette.name
      this.buttonIconTarget.innerHTML = palette.icon
    }
  }

  openMenu() {
    this.isOpenValue = true
    this.optionsTarget.classList.remove(this.hiddenClass)
  }

  closeMenu() {
    this.isOpenValue = false
    this.optionsTarget.classList.add(this.hiddenClass)
  }

  changeThemeColors(event) {
    const palette = event.target.dataset.pallete
    const name = event.target.innerText
    this.savePalette(palette, name)
    this.changePalette()
    this.closeMenu()
  }

  toggleMenu(event) {
    if (!this.isOpenValue) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }
}
