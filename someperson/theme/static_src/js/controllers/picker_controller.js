import { Controller } from "stimulus"
import Storage from "../storage"


export default class extends Controller {

  static classes = [
    "hidden",
  ]

  static targets = [
    "links",
    "palettes",
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

      document.querySelectorAll(".picker-item").forEach(el => {
        el.classList.remove("picker-item-selected")
      })
      document.querySelector(`#picker-item-${palette.id}`).classList.add("picker-item-selected")

    }
  }

  changeThemeColors(event) {
    const palette = JSON.parse(event.currentTarget.dataset.pallete)
    this.savePalette(palette)
    this.changePalette()
  }

  openMenu() {
    this.isOpenValue = true
    this.linksTarget.classList.remove(this.hiddenClass)
    this.palettesTarget.classList.remove(this.hiddenClass)
    document.querySelector("div#main").classList.add("defocus")
  }

  closeMenu() {
    this.isOpenValue = false
    this.linksTarget.classList.add(this.hiddenClass)
    this.palettesTarget.classList.add(this.hiddenClass)
    document.querySelector("div#main").classList.remove("defocus")
  }

  toggleMenu(event) {
    if (!this.isOpenValue) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }

  closeIfNeeded(event) {
    if (!(this.element.contains(event.target)) && this.isOpenValue) {
      this.closeMenu()
    }
  }
}
