//export to index.js
/*
(In index.js) Create an instance of the PopupWithForm class for
each popup that contains a form, and call their setEventListeners() method. 
*/
import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  //Two arguments: the modal selector and a callback function
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
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

  //Public method setEventListeners()
  setEventListeners() {
    //call setEventListeners() method of the parent (Modal) class
    super.setEventListeners();
    //add submit event listener to the form
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
