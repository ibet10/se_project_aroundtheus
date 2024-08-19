//PopupWithForm Class

//export to index.js

/*
The PopupWithForm should be a child of Popup (extends), and it should comply with the following requirements:

1. It accepts two arguments: the popup selector and a callback function, which PopupWithForm calls when the form’s submit event fires.

2. It has a private method named _getInputValues(), which collects data from all the input fields and returns it as an object. 
 a. this data should then be passed to the submission handler as an argument.

3. It overrides the setEventListeners() parent method. The setEventListeners() method of the PopupWithForm class should:
 a. add a submit event listener to the form and 
 b. call the setEventListeners() method of the parent class.

4. (In index.js) Create an instance of the PopupWithForm class for each popup that contains a form, and call their setEventListeners() method.

*/

import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  //Two arguments: the modal selector and a callback function
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this.modalForm = this.modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  //Private method _getInputValues()
  _getInputValues() {
    //collects data from all the input fields and returns it as an object
  }

  //Public method setEventListeners()
  setEventListeners() {
    //add submit event listener to the form
    //call setEventListeners() method of the parent (Modal) class
  }
}
