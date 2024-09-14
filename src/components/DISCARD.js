/*import Api from "../components/Api.js";

import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import ModalWithForm from "../components/ModalWithForm.js";

import ModalWithImage from "../components/ModalWithImage.js";

import ModalConfirmDelete from "../components/ModalConfirmDelete.js";

import { configItems, initialCards } from "../utils/constants.js";

import "./index.css";
*/

//
// API
//

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5457953a-b073-4cb8-8a6a-6ab24a852af5",
    "Content-Type": "application/json,",
  },
});

//
// Profile Modal Elements
//
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModalPopup = document.querySelector("#profile-edit-modal");
const profileModalTitleInput =
  profileEditModalPopup.querySelector("#modal-title-input");
const profileModalDescriptionInput = profileEditModalPopup.querySelector(
  "#modal-description-input"
);
const profileEditModalForm = document.forms["profile-form"];

const profileAvatarButton = document.querySelector(
  ".profile__avatar-edit-button"
);
const profileAvatarModal = document.querySelector("#profile-avatar-modal");
const profileAvatarModalForm = document.forms[".update-avatar-form"]; //for Validator, use name.

//
// Add Card Modal Elements
//
const addNewCardModalButton = document.querySelector(".profile__add-button");
const addCardModalForm = document.forms["add-card-form"];
const addCardTitleInput = addCardModalForm.querySelector(
  ".modal__input_type_title"
);
const addCardUrlInput = addCardModalForm.querySelector(
  ".modal__input_type_url"
);

//
// Delete Confirmation Modal Elements
//
/*
const confirmDeleteButton = .querySelector(
  ".modal__button-confirm-submit"
);
*/

//
// UserInfo Instantiation
//
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avtarSelector: ".profile__image",
});

//
// Section Instantiation
//
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);

//
// Special Function: createCard
//

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

//
// ModalWithForm Instantiation
//
const addCardModal = new ModalWithForm(
  "#add-card-modal",
  handleAddCardModalSubmit
);
addCardModal.setEventListeners();

const profileModal = new ModalWithForm(
  "#profile-edit-modal",
  handleProfileModalSubmit
);
profileModal.setEventListeners();

//
// ModalWithImage Instantiation
//
const imagePreviewModal = new ModalWithImage("#preview-image-modal");
imagePreviewModal.setEventListeners();

//
// ModalConfirmDelete Instantiation
//
// will probably need to add an eventlistener
// and also will need to use validator form, use form name
/*
const deleteConfirmation = new ModalConfirmDelete({
  modalSelector: "#",
});
*/

//
// Form Validation
//
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(configItems);

//
//Event Handlers
//

//REFACTOR to pass return api
function handleProfileModalSubmit(data) {
  userInfo.setUserInfo({
    title: data.title,
    description: data.description,
  });

  profileModal.close();
}

//REFACTOR to pass return api
function handleAddCardModalSubmit(data) {
  const name = data.title;
  const link = data.url;

  const cardData = { name, link };

  const cardElement = createCard(cardData);
  section.addItem(cardElement);

  addCardModalForm.reset();
  formValidators["add-card-modal-form"].disableSubmitButton();

  addCardModal.close();
}

const handleImageClick = (name, link) => {
  imagePreviewModal.open({ name, link });
};

//
// Event Listeners
//
addNewCardModalButton.addEventListener("click", () => {
  addCardModal.open();
});

//ADD eventListener for Avatar edit form

profileEditButton.addEventListener("click", () => {
  formValidators["profile-edit-modal-form"].resetValidation();

  const userData = userInfo.getUserInfo();

  profileModalTitleInput.value = userData.title || "";
  profileModalDescriptionInput.value = userData.description || "";

  profileModal.open();
});

section.renderItems();

//
// Elements Not In Use {For Personal Reference}
/*
const profileTitle = document.querySelector(".profile__title"); 
const profileDescription = document.querySelector(".profile__description");
const cardListEl = document.querySelector(".cards__list");
const addCardModal = document.querySelector("#add-card-modal");
const previewImageModal = document.querySelector("#preview-image-modal"); //remove
const previewModalImageEl = previewImageModal.querySelector(
  ".modal__preview-image"
);
const previewModalCaptionEl =
  previewImageModal.querySelector(".modal__caption");
//const modalCloseButtons = document.querySelectorAll(".modal__close");
*/
//
//
