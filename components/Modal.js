//Popup Class
//export to index.js

/*
The Popup class is a generic class that opens and closes a popup. 
Create it according to the following requirements:

1. The constructor accepts a single parameter, the popup selector.

2. It has public methods called open() and close() to open and close the popup. 
     a. the open() method should be called in the preexisting event handlers in index.js.

3. It has a private method named _handleEscClose() that stores the logic for closing the popup by pressing the Esc key.

4. It has a public method named setEventListeners() that adds a click event listener to the close icon of the popup. 
     a. the modal window should also close when users click on the shaded area around the form.

You won’t instantiate your Popup class directly in index.js; instead, you’ll instantiate its children classes (ModalWithImage and ModalWithForm).
*/

export default class Modal {
  constructor(modalSelector) {
    //popupSelector
    this.modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Public method open() & call into preexisting evenhandlers in index.js
  open() {
    this.modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  /*
  function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByPressingESCKey);
} 
  */

  //Public method close()
  close() {
    this.modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  /* 
    function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByPressingESCKey);
}
  */

  //Private method _handleEscClose()
  _handleEscClose(e) {
    //store logic for closing the modal by pressing Esc key

    if (e.key === "Escape") {
      this.close();
    }
  }
  /*
  function closeModalByPressingESCKey(e) {
    if (e.key === "Escape") {
      const modal = document.querySelector(".modal_opened");
      return closeModal(modal);
  }
     */

  //Public method setEventListeners()
  setEventListeners() {
    //adds click event listener to the close icon of the modal (".modal__close")
    this.modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
    //also close when shaded area around the form is clicked (the ".modal_opened" class in CSS)
    this.modalElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
  /*function closeModalByClickingOverlay(e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
} */
}
