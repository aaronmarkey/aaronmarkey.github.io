class ThemePicker {
  idRange = {
    min: 100000,
    max: 999999
  }

  constructor({ options, active, selectedAction }) {
    this.options = options;
    this.active = active;
    this.selectedAction = selectedAction;

    this.uid = randomInt(this.idRange.min, this.idRange.max);
    this.selectors = {
      picker: `picker-${this.uid}`,
      button: `btn-${this.uid}`,
      content: `content-${this.uid}`,
    }

    this.element = null;
    this.isOpen = false;
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
    button.innerHTML = this.options[this.active]

    button.addEventListener("click", _ => {
      if (this.isOpen) {
        this.close()
      } else {
        this.open()
      }
    });

    return button;
  }

  createOption(value, display) {
    const option = document.createElement("div");
    option.innerHTML = display;

    option.addEventListener("click", el => {
      this.selectedAction(value, display);
      this.updatePicker(value);
      this.close();
    });

    return option;
  }

  updatePicker(active) {
    this.active = active;
  }

  open() {
    this.isOpen = true;
    const picker = this.element.querySelector(dot(this.selectors.picker));
    picker.prepend(document.createElement("hr"))
    for (let key of Object.keys(this.options)) {
      const option = this.createOption(key, this.options[key]);
      picker.prepend(option);
    }
  }

  close() {
    this.isOpen = false;
    this.createPicker();
  }
}
