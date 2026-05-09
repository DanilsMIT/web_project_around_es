import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
    this._okButton = this._PopupSelector.querySelector(".popup__button");
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  open(deleteFunction) {
    super.open();
    document.addEventListener("keydown", this._handleSubmit);
    this._deleteFunction = deleteFunction;
  }

  close() {
    super.close();
    document.removeEventListener("keydown", this._handleSubmit);
  }

  _handleSubmit(event) {
    if (event.key === "Enter") {
      this._deleteFunction();
      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._okButton.addEventListener("click", () => {
      this._deleteFunction();
    });
  }
}
