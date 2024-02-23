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
    isOpen: Boolean,
    defaultPaletteId: String
  }

  initialize() {
    this.storage = new Storage();
    const paletteId = this.setPalette();
    this.savePaletteId(paletteId);
  }

  setPalette() {
    const known = this.storage.getItem("paletteId");
    const paletteId = known === null ? this.defaultPaletteIdValue : known;

    const body = document.querySelector("body");
    body.className = "";
    body.classList.add(`palette-${paletteId}`);

    document.querySelectorAll(".picker-item").forEach(el => {
      el.classList.remove("picker-item-selected");
    });
    document.querySelector(`#picker-item-${paletteId}`).classList.add("picker-item-selected");
    return paletteId;
  }

  savePaletteId(paletteId) {
    this.storage.setItem("paletteId", paletteId);
  }

  paletteSelected(event) {
    const paletteId = event.currentTarget.dataset.paletteId || null;
    this.savePaletteId(paletteId);
    this.setPalette();
  }

  openMenu() {
    this.isOpenValue = true;
    this.linksTarget.classList.remove(this.hiddenClass);
    this.palettesTarget.classList.remove(this.hiddenClass);
    document.querySelector("div#main").classList.add("defocus");
  }

  closeMenu() {
    this.isOpenValue = false
    this.linksTarget.classList.add(this.hiddenClass);
    this.palettesTarget.classList.add(this.hiddenClass);
    document.querySelector("div#main").classList.remove("defocus");
  }

  toggleMenu(event) {
    if (!this.isOpenValue) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  closeIfNeeded(event) {
    if (!(this.element.contains(event.target)) && this.isOpenValue) {
      this.closeMenu();
    }
  }
}
