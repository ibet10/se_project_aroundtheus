import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  //Two arguments: the modal selector and a callback function
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._modalForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  //Private method _getInputValues()
  _getInputValues() {
    //collects data from all the input fields and returns it as an object
    const inputFields = {};
    this._inputList.forEach((input) => {
      inputFields[input.name] = input.value;
    });
    return inputFields;
  }

  //Public method renderLoading()
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  //Public method getInputValues()
  getInputValues() {
    return this._getInputValues();
  }

  //Public method setEventListeners()
  setEventListeners() {
    //add submit event listener to the form
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
    //call setEventListeners() method of the parent (Modal) class
    super.setEventListeners();
  }
}
