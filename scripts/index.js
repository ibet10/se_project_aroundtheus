import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//
// Profile Modal Elements
//

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModalPopup = document.querySelector("#profile-edit-modal");

const profileModalCloseButton = profileEditModalPopup.querySelector(
  "#modal-button-close"
); //remove profileModalCloseButton?

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileModalTitleInput =
  profileEditModalPopup.querySelector("#modal-title-input");
const profileModalDescriptionInput = profileEditModalPopup.querySelector(
  "#modal-description-input"
);
const profileEditModalForm = document.forms["profile-form"];

//
// Card List Element
//

const cardListEl = document.querySelector(".cards__list");

//
// Add Card Modal Elements
//

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardModalButton = document.querySelector(".profile__add-button");

const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-button-close "
); //remove addCardModalCloseButton?

const addCardModalForm = document.forms["add-card-form"];
const addCardTitleInput = addCardModalForm.querySelector(
  ".modal__input_type_title"
);
const addCardUrlInput = addCardModalForm.querySelector(
  ".modal__input_type_url"
);

//
// Preview Image Modal Elements
//

const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalImageEl = previewImageModal.querySelector(
  ".modal__preview-image"
);
const previewModalCaptionEl =
  previewImageModal.querySelector(".modal__caption");
const previewImageModalCloseButton = previewImageModal.querySelector(
  "#preview-image-modal-button-close"
); // remove previewImageModalCloseButton?

//
// Modal Buttons Elements
//

const modalCloseButtons = document.querySelectorAll(".modal__close");

//
//Closing Modal by ESC key and Overlay Feature
//

const allModals = [profileEditModalPopup, addCardModal, previewImageModal];
allModals.forEach((modal) => {
  modal.addEventListener("click", closeModalByClickingOverlay);
});

function closeModalByPressingESCKey(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    return closeModal(modal);
  }
}

function closeModalByClickingOverlay(e) {
  if (e.target.classList.contains("modal")) {
    closeModal(e.target);
  }
}

//
// Form Validation
//

const configItems = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditFormValidator = new FormValidator(
  configItems,
  profileEditModalForm
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configItems, addCardModalForm);
addCardFormValidator.enableValidation();

//
//Functions
//

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByPressingESCKey);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByPressingESCKey);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

//
//Event Handlers
//

function handleProfileModalSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileModalTitleInput.value;
  profileDescription.textContent = profileModalDescriptionInput.value;
  closeModal(profileEditModalPopup);
}

function handleAddCardModalSubmit(e) {
  e.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;

  renderCard({ name, link }, cardListEl);

  e.target.reset();
  closeModal(addCardModal);
}

const handleImageClick = (name, link) => {
  previewModalImageEl.src = link;
  previewModalImageEl.alt = name;
  previewModalCaptionEl.textContent = name;
  openModal(previewImageModal);
};

//
//Event Listeners
//

profileEditModalForm.addEventListener("submit", handleProfileModalSubmit);

addCardModalForm.addEventListener("submit", handleAddCardModalSubmit);

profileEditButton.addEventListener("click", () => {
  profileModalTitleInput.value = profileTitle.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModalPopup);
});

addNewCardModalButton.addEventListener("click", () => openModal(addCardModal));

modalCloseButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
