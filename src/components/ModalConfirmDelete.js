import Modal from "./Modal.js";

export default class ModalConfirmDelete extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._modalSubmitButton = this._modalElement.querySelector(
      ".modal__button-confirm"
    );
  }

  /*
Ensure that the handleFormSubmit function set via setDeleteConfirmation()
returns a promise, particularly if it's doing something like making a 
network request (e.g., deleting a card on a server).
*/
  //Public method setDeleteConfirmation()
  setDeleteConfirmation(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  //Public method setEventListeners()
  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
      this._modalForm.reset();
      this.close();
    });
    super.setEventListeners();
  }
  /*
  setEventListeners() {
this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this._handleFormSubmit === "function") {
        this._handleFormSubmit()
          .then(() => {
            this._modalForm.reset();
            this.close();
          })
          .catch((err) => {
            console.error("Error during form submission", err);
          });
      } else {
        console.error("No form submit handler is set");
      }
    });

    super.setEventListeners();
  }
    */
}
