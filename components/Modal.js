export default class Modal {
  constructor(modalSelector) {
    //popupSelector
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  //Public method open() & call into preexisting evenhandlers in index.js
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  //Public method close()
  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  //Private method _handleEscClose()
  _handleEscClose(e) {
    //store logic for closing the modal by pressing Esc key
    if (e.key === "Escape") {
      this.close();
    }
  }

  //Public method setEventListeners()
  setEventListeners() {
    //adds click event listener to the close icon of the modal (".modal__close")
    this._modalElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
    //also close when shaded area around the form is clicked
    this._modalElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
