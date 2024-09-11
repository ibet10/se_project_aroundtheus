import Modal from "./Modal.js";

export default class ModalConfirmDelete extends Modal {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._modalSubmitButton = this._modalElement.querySelector(
      ".modal__button-confirm-submit"
    );
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
