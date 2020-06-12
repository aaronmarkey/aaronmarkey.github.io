class PalettePicker {
  constructor({ paletteOptions, activePalette, selectedAction }) {
    this.paletteOptions = paletteOptions;
    this.activePalette = activePalette;
    this.selectedAction = selectedAction;

    this.selectors = {
      picker: `picker-${this.uid}`,
      button: `btn-${this.uid}`,
      content: `content-${this.uid}`,
    }

    this.element = null;
    this.isOpen = false;
    this.idRange = {
      min: 100000,
      max: 999999
    };
    this.uid = randomInt(this.idRange.min, this.idRange.max);
  }

  mount(selector) {
    this.element = document.querySelector(selector);
    this.createPicker();
  }

  createPicker () {
    const dropup = document.createElement("div");
    const button = this.createButton();

    dropup.classList.add(this.selectors.picker);
    dropup.appendChild(button);

    this.element.innerHTML = "";
    this.element.appendChild(dropup);
  }

  createButton() {
    const button = document.createElement("div");
    button.classList.add(this.selectors.button);
    button.innerHTML = this.activePalette.name

    button.addEventListener("click", _ => {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    });

    return button;
  }

  createOption(palette) {
    const option = document.createElement("div");
    option.innerHTML = palette.name;

    option.addEventListener("click", _ => {
      this.selectedAction(palette);
      this.updatePicker(palette);
      this.close();
    });

    return option;
  }

  updatePicker(activePalette) {
    this.activePalette = activePalette;
  }

  open() {
    this.isOpen = true;
    const picker = this.element.querySelector(dot(this.selectors.picker));
    picker.prepend(document.createElement("hr"))
    let keys = Object.keys(this.paletteOptions);
    keys.sort()
    keys.reverse()
    for (let key of keys) {
      const option = this.createOption(this.paletteOptions[key]);
      picker.prepend(option);
    }
  }

  close() {
    this.isOpen = false;
    this.createPicker();
  }
}
