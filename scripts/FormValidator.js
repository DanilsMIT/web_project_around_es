/* mensajes de error*/
export default class FormValidator {
  constructor(settings, form) {
    this._setting = settings;
    this._formElement = form;
  }

  /*mensajes inputs error*/
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement
      .closest("form")
      .querySelector(`.${inputElement.id}-input-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement
      .closest("form")
      .querySelector(`.${inputElement.id}-input-error`);
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
    } else {
      hideInputError(input);
    }
  }

  /*boton submit error*/
  _hasInvalidInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid);
  }

  _inputSubmit(event, inputs) {
    let formValid = true;
    inputs.forEach((input) => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
        formValid = false;
      }
    });

    if (!formValid) {
      event.preventDefault();
    }
  }

  _toggleButtonState(inputs, button) {
    if (hasInvalidInput(inputs)) {
      button.classList.add("button__disabled");
      button.disabled = true;
    } else {
      button.classList.remove("button__disabled");
      button.disabled = false;
    }
  }
}
