import { Controller } from "stimulus";
import Storage from "../storage";


export default class extends Controller {

    static classes = [
        "hidden",
    ];

    static targets = [
        "links",
        "palettes",
        "picker",
    ];

    static values = {
        isOpen: Boolean,
        defaultPaletteId: String
    };

    initialize() {
        this.storage = new Storage();
        const paletteId = this.setPalette();
        this.savePaletteId(paletteId);
    }

    setPalette() {
        // Get correct palette ID
        // If one is set in storage, use that. Else, use the default.
        const known = this.storage.getItem("paletteId");
        const paletteId = known === null ? this.defaultPaletteIdValue : known;

        // Set palette class on html element
        const html = document.querySelector("html");
        html.className = "";
        html.classList.add(`palette-${paletteId}`);

        // Set currently selected picker item
        document.querySelectorAll(".picker-item").forEach(el => {
            el.classList.remove("picker-item-selected");
        });
        document.querySelector(`#picker-item-${paletteId}`).classList.add("picker-item-selected");

        // Set meta tag theme-color content via it's "color" attribute set by CSS.
        const themeColor = document.querySelector("meta[name='theme-color']");
        const style = getComputedStyle(themeColor);
        themeColor.setAttribute("content", style.color);

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
    }

    closeMenu() {
        this.isOpenValue = false;
        this.linksTarget.classList.add(this.hiddenClass);
        this.palettesTarget.classList.add(this.hiddenClass);
    }

    toggleMenu() {
        if (!this.isOpenValue) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
        this.dispatch("toggled", {detail: {isOpen: this.isOpenValue}});
    }

    closeIfNeeded(event) {
        if (!(this.element.contains(event.target)) && this.isOpenValue) {
            this.toggleMenu();
        }
    }
}
