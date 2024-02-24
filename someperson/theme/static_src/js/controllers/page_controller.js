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

    pickerWasToggled({detail: {isOpen}}) {
        if (isOpen) {
            this.selfTarget.classList.add(this.disabledClass);
            this.selfTarget.classList.add(this.defocusedClass);
        } else {
            this.selfTarget.classList.remove(this.disabledClass);
            this.selfTarget.classList.remove(this.defocusedClass);
        }
    }
}
