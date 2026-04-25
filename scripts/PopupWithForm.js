import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ PopupSelector, handleFormSubmit }) {
    super(PopupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._PopupSelector.querySelector(".popup__form");
    this._inputs = this._PopupSelector.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
