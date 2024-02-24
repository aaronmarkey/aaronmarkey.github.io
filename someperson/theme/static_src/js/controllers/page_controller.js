import { Controller } from "stimulus";

export default class extends Controller {

    static classes = [
        "hidden",
        "storyContent"
    ];

    static targets = [
        "overlay"
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
}
