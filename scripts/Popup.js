export default class Popup {
  constructor(PopupSelector) {
    this._PopupSelector = PopupSelector;
  }

  open() {
    this._PopupSelector.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._PopupSelector.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }
  setEventListeners() {
    this._PopupSelector.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_is-opened")) {
        this.close();
      }
      if (event.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}
