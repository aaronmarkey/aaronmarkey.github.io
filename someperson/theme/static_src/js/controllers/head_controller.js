import { Controller } from "stimulus";
import fonts from "../fonts";

export default class extends Controller {

    initialize() {
        this.fonts = (() => {
            const body = fonts.getRandomFont("body");
            const code = fonts.getRandomFont("code");
            let header = body;
            while (header === body) {
                header = fonts.getRandomFont("body");
            }
            return {body, code, header};
        })();
        this.injectFont(this.fonts.body);
        this.injectFont(this.fonts.code);
        this.injectFont(this.fonts.header);
        this.setPageFonts();
    }

    injectFont(font) {
        const el = fonts.elementForFont(font);
        this.element.parentNode.insertBefore(el, this.element);
    }

    setPageFonts() {
        const styles = `
      body {
        font-family: ${this.fonts.body};
      }
      code {
        font-family: ${this.fonts.code};
      }
      .story h1,
      .story h2,
      .story h3,
      .story h4,
      .story h5,
      .story h6 {
        font-family: ${this.fonts.header};
      }
    `;
        this.element.innerHTML = styles;
    }
}