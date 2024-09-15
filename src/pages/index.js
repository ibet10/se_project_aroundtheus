import Api from "../components/API.js";

import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import ModalWithForm from "../components/ModalWithForm.js";

import ModalWithImage from "../components/ModalWithImage.js";

import ModalConfirmDelete from "../components/ModalConfirmDelete.js";

import { configItems, initialCards } from "../utils/constants.js"; //remove InitialCards

import "./index.css";

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
const profileAvatarModalForm = document.forms["update-avatar-form"]; //for Validator, use name.

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
// Section Instantiation
//
// New CODE ADDED to TEST
const section = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    },
  },
  ".cards__list"
);
/*
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
*/

//
// Fetch User and Cards Data on Page Load
//

// New CODE ADDED to TEST
api
  .getCardsAndUserInfo()
  .then(([cardsData, userData]) => {
    console.log("Card Data:", cardsData);
    console.log("User Data:", userData);
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });

    section.renderItems(cardsData);
  })
  .catch((err) => console.log(`Failed to load data: ${err}`));

//
// UserInfo Instantiation
//
const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avtarSelector: ".profile__image",
});

//
// Special Function: createCard
//
// New CODE ADDED to TEST
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleLikeCard,
    handleDeleteCard
  );
  return card.getView();
}
/*
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}
*/
//
// ModalWithForm Instantiation
//
// New CODE ADDED to TEST
const addCardModal = new ModalWithForm("#add-card-modal", (addCardData) => {
  addCardModal.setLoading(true);
  handleAddCardModalSubmit(addCardData);
});

addCardModal.setEventListeners();

/*
const addCardModal = new ModalWithForm("#add-card-modal", (addCardData) => {
  addCardModal.setLoading(true);
  api
    .createNewCard({ name: addCardData.title, link: addCardData.url })
    .then((cardData) => {
      createCard(cardData);
      addCardModal.close();
    })
    .catch((err) => console.error("Error adding new card:", err))
    .finally(() => {
      addCardModal.setLoading(false);
    });
});
addCardModal.setEventListeners();
*/

// New CODE ADDED to TEST
const profileModal = new ModalWithForm("#profile-edit-modal", (profileData) => {
  profileModal.setLoading(true);
  handleProfileModalSubmit(profileData);
});

profileModal.setEventListeners();
/*
const profileModal = new ModalWithForm("#profile-edit-modal", (profileData) => {
  profileModal.setLoading(true);

  api
    .updateProfileInfo(profileData.title, profileData.description)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData.title, updatedUserData.description);
      profileModal.close();
    })
    .catch((err) =>
      console.error("Error updating profile user information:", err)
    )
    .finally(() => {
      profileModal.setLoading(false);
    });
});
profileModal.setEventListeners();
*/

//
// ModalWithImage Instantiation
//
const imagePreviewModal = new ModalWithImage("#preview-image-modal");
imagePreviewModal.setEventListeners();

//
// Profile Update Avatar Modal Instantiation
//
// New CODE ADDED to TEST
const avatarUpdateModal = new ModalWithForm(
  "#profile-avatar-modal",
  (avatarData) => {
    avatarUpdateModal.setLoading(true);

    api
      .updateAvatar(avatarData.link)
      .then((res) => {
        userInfo.changeAvatar(res.avatar);
        avatarUpdateModal.close();
      })
      .catch((err) => console.error("Error updating profile image:", err))
      .finally(() => {
        avatarUpdateModal.setLoading(false);
      });
  }
);

//
// ModalConfirmDelete Instantiation
//
// New CODE ADDED to TEST
const deleteConfirmation = new ModalConfirmDelete("#delete-card-confirm-modal");
deleteConfirmation.setEventListeners();

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

// New CODE ADDED to TEST
function handleProfileModalSubmit(data) {
  api
    .updateProfileInfo(data.title, data.description)
    .then((userData) => {
      userInfo.setUserInfo({
        title: userData.name,
        description: userData.about,
      });
      profileModal.close();
    })
    .catch((err) => console.error(`Failed to update user info: ${err}`))
    .finally(() => {
      profileModal.setLoading(false);
    });
}

// New CODE ADDED to TEST
function handleAddCardModalSubmit(data) {
  api
    .createNewCard({ name: data.title, link: data.url })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);

      addCardModalForm.reset();
      formValidators["add-card-form"].disableSubmitButton();
      addCardModal.close();
    })
    .catch((err) => console.log(`Failed to add card: ${err}`))
    .finally(() => {
      addCardModal.setLoading(false);
    });
}
/*
   function handleAddCardModalSubmit(data) {
  api
    .createNewCard({ name: data.title, link: data.url })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);

      addCardModalForm.reset();
      formValidators["add-card-form"].disableSubmitButton();
      addCardModal.close();
    })
    .catch((err) => console.log(`Failed to add card: ${err}`));
}
*/

const handleImageClick = (name, link) => {
  imagePreviewModal.open({ name, link });
};

//Delete a Card using api.deleteCard method
//when implementing ModalConfirmDelete, use this method to remove cards both from the UI and the server.
/*
function handleDeleteCard(data) {
deleteConfirmation.open();
deleteConfirmation.setDeleteConfirmation(() => {
  api.deleteCard(data._id)
  .then(() => {
   deleteConfirmation.close();
   data.handleDeleteButton();
    })
   .catch(console.error);
});
}
*/

//Like a Card using api.likeCard and api.dislikeCard methods
/*
function handleLikeCard(data) {
}
*/

//
// Event Listeners
//
addNewCardModalButton.addEventListener("click", () => {
  addCardModal.open();
});

//ADD eventListener for Avatar edit form
// New CODE ADDED to TEST
profileAvatarButton.addEventListener("click", () => {
  avatarUpdateModal.open();
  formValidators["update-avatar-modal-form"].enableValidation(); //not sure if correct
});

profileEditButton.addEventListener("click", () => {
  formValidators["profile-edit-modal-form"].resetValidation();

  const userData = userInfo.getUserInfo();

  profileModalTitleInput.value = userData.title || "";
  profileModalDescriptionInput.value = userData.description || "";

  profileModal.open();
});

section.renderItems();
/*
//PREVIOUS CODE FOR PERSONAL REFERENCE
//
// Elements Not In Use {For Personal Reference}
//
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

const handleImageClick = (name, link) => {
  imagePreviewModal.open({ name, link });
};

//
// Event Listeners
//
addNewCardModalButton.addEventListener("click", () => {
  addCardModal.open();
});

profileEditButton.addEventListener("click", () => {
  formValidators["profile-edit-modal-form"].resetValidation();

  const userData = userInfo.getUserInfo();

  profileModalTitleInput.value = userData.title || "";
  profileModalDescriptionInput.value = userData.description || "";

  profileModal.open();
});

section.renderItems();
*/
//
//
