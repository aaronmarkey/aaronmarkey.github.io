import { Controller } from "stimulus";

export default class extends Controller {

    static classes = [
        "defocused",
        "disabled",
        "hidden",
        "storyContent"
    ];

    static targets = [
        "overlay",
        "self"
    ];

    initialize() {
        const imageSelector = `.${this.storyContentClass} img`;
        const images = document.querySelectorAll(imageSelector);

        images.forEach(element => {
            element.addEventListener("click", el => {
                const img = document.createElement("img");
                img.src = el.target.src;
                img.alt = el.target.alt;
                this.overlayTarget.appendChild(img);
                this.overlayTarget.classList.remove(this.hiddenClass);
            });
        });
    }

    hideOverlay() {
        this.overlayTarget.innerHTML = "";
        this.overlayTarget.classList.add(this.hiddenClass);
    }

    /**
     * Set meta tag theme-color content via it's "color" attribute set by CSS.
     */
    setMetaThemeColor() {
        const themeColor = document.querySelector("meta[name='theme-color']");
        const style = getComputedStyle(themeColor);
        themeColor.setAttribute("content", style.color);
    }

    pickerWasToggled({detail: {isOpen}}) {
        isOpen
            ? this.selfTarget.classList.add(this.disabledClass, this.defocusedClass)
            : this.selfTarget.classList.remove(this.disabledClass, this.defocusedClass);
    }

    paletteWasUpdated({ detail: {palette}}) {
        // Set palette class on html element
        const html = document.querySelector("html");
        html.className = "";
        html.classList.add(`palette-${palette.id}`);

        this.setMetaThemeColor();
    }
}
