import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._image = this._modalElement.querySelector(".modal__preview-image");
    this._caption = this._modalElement.querySelector(".modal__caption");
  }

  open({ name, link }) {
    // set the image's src and alt
    this._image.src = link;
    this._image.alt = name;
    // set the caption's textContent
    this._caption.textContent = name;
    super.open();
  }
}
