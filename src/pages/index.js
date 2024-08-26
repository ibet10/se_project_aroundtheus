import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import ModalWithForm from "../components/ModalWithForm.js";

import ModalWithImage from "../components/ModalWithImage.js";

import { configItems, initialCards } from "../utils/constants.js";

import "./index.css";

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
// UserInfo Instantiation
//
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
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
function handleProfileModalSubmit(data) {
  userInfo.setUserInfo({
    title: data.title,
    description: data.description,
  });

  profileModal.close();
}

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
/*
function handleAddCardModalSubmit() {
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  const cardData = { name, link };

  //const cardData = addCardModal.getInputValues();

  const cardElement = createCard(cardData);
  section.addItem(cardElement);

  addCardModalForm.reset();
  formValidators["add-card-modal-form"].disableSubmitButton();

  addCardModal.close();
}
  */

const handleImageClick = (name, link) => {
  imagePreviewModal.open({ name, link });
};

//
// Event Listeners
//
addNewCardModalButton.addEventListener("click", () => {
  addCardModal.open();
});
/*
addNewCardModalButton.addEventListener("click", () => {
  addCardModalForm.reset();
  formValidators["add-card-modal-form"].resetValidation();
  addCardModal.open();
});
*/

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
