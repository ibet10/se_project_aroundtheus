export default class FormValidator {
  //1. Its constructor has two parameters:
  constructor(configItems, formElement) {
    this._inputSelector = configItems._inputSelector;
    this._submitButtonSelector = configItems._submitButtonSelector;
    this._inactiveButtonClass = configItems._inactiveButtonClass;
    this._inputErrorClass = configItems._inputErrorClass;
    this._errorClass = configItems.errorClass;

    this._form = formElement;

    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }
  // 2. It has private methods for processing the form:
  _showInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return _showInputError(inputElement);
    }

    _hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(inputElements)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }

    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListerners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  // 3. It has a public method enableValidation(), which enables form validation:
  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListerners();
  }
  // 4. It has a public method to either disable the state of the button or reset form validation (including the state of the submit button):
  restValidation() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}
