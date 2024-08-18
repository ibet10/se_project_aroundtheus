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
  }

  //Public method open()
  open() {
    //call into preexisting evenhandlers in index.js
  }

  //Public method close()
  close() {}

  //Private method _handleEscClose()
  _handleEscClose() {
    //store logic for closing the modal by pressing Esc key
  }

  //Public method setEventListeners()
  setEventListeners() {
    //adds click event listener to the close icon of the modal (const modalCloseButtons = document.querySelectorAll(".modal__close"); OR just html ".modal__close")
    //also close when shaded area around the form is clicked (the ".modal_opened" class in CSS)
  }
}
