import { Controller } from "stimulus";
import Storage from "../storage";


export default class extends Controller {

    static classes = [
        "hidden",
    ];

    static targets = [
        "menu",
    ];

    static values = {
        isOpen: Boolean,
        defaultPalette: Object
    };

    initialize() {
        this.storage = new Storage();
        const userPalette = this.storage.getItem("palette");
        const defaultPalette = this.defaultPaletteValue;
        this.setPalette(userPalette || defaultPalette);
    }

    setPalette(palette) {
        this.storage.setItem("palette", palette);

        // Set currently selected picker item
        document.querySelectorAll(".picker-item").forEach(el => {
            el.classList.remove("picker-item-selected");
        });
        document.querySelector(`#picker-item-${palette.id}`).classList.add("picker-item-selected");

        // Emit event for palette change
        this.dispatch("paletteUpdated", {detail: { palette }});
    }

    paletteSelected(event) {
        const palette = JSON.parse(event.currentTarget.dataset.palette);
        this.setPalette(palette);
    }

    openMenu() {
        this.isOpenValue = true;
        this.menuTarget.classList.remove(this.hiddenClass);
    }

    closeMenu() {
        this.isOpenValue = false;
        this.menuTarget.classList.add(this.hiddenClass);
    }

    toggleMenu() {
        this.isOpenValue ? this.closeMenu() : this.openMenu();
        this.dispatch("toggled", {detail: {isOpen: this.isOpenValue}});
    }

    closeIfNeeded(event) {
        if (!(this.element.contains(event.target)) && this.isOpenValue) {
            this.toggleMenu();
        }
    }
}
