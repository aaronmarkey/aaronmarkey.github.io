import { Controller } from "stimulus"


export default class extends Controller {

  static classes = [
    "hideSm",
    "hideXs"
  ]

  static targets = [
    "links"
  ]

  static values = {
    isOpen: Boolean
  }

  openMenu() {
    this.linksTarget.classList.remove(this.hideSmClass)
    this.linksTarget.classList.remove(this.hideXsClass)
    this.isOpenValue = true
  }

  closeMenu() {
    this.linksTarget.classList.add(this.hideSmClass)
    this.linksTarget.classList.add(this.hideXsClass)
    this.isOpenValue = false
  }

  toggleMenu() {
    if (this.isOpenValue) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

}
