/* mensajes de error*/
export default class FormValidator {
  constructor(settings, form) {
    this._setting = settings;
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._setting.input));
    this._buttonForm = this._form.querySelector(this._setting.button);
  }

  /*mensajes inputs error*/
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._setting.inputErrorText);
    errorElement.classList.add(this._setting.showError);
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-input-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._setting.inputErrorText);
    errorElement.classList.remove(this._setting.showError);
  }

  /*comprobación boton*/
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonForm.classList.add(this._setting.buttonDisabled);
      this._buttonForm.disabled = true;
    } else {
      this._buttonForm.classList.remove(this._setting.buttonDisabled);
      this._buttonForm.disabled = false;
    }
  }

  setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidator() {
    // 1. Vuelve a revisar si el botón debe estar encendido o apagado
    this._toggleButtonState();

    // 2. Limpia todos los mensajes de error visuales (líneas rojas y textos)
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
