import Api from "../components/API.js";

import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import ModalWithForm from "../components/ModalWithForm.js";

import ModalWithImage from "../components/ModalWithImage.js";

import ModalConfirmDelete from "../components/ModalConfirmDelete.js";

import { configItems } from "../utils/constants.js"; //removed InitialCards

import "./index.css";

//
// API
//

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5457953a-b073-4cb8-8a6a-6ab24a852af5",
    "Content-Type": "application/json",
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

const profileAvatarButton = document.querySelector(
  ".profile__avatar-edit-button"
);

/* Elements not in Use
const profileEditModalForm = document.forms["profile-form"];
const profileAvatarImage = document.querySelector(".profile__image");
const profileAvatarModal = document.querySelector("#profile-avatar-modal");
const profileAvatarModalForm = document.forms["update-avatar-form"];
const addCardTitleInput = addCardModalForm.querySelector(
  ".modal__input_type_title"
);
const addCardUrlInput = addCardModalForm.querySelector(
  ".modal__input_type_url"
);
*/

//
// Add Card Modal Elements
//
const addNewCardModalButton = document.querySelector(".profile__add-button");
const addCardModalForm = document.forms["add-card-form"];

//
// Section Instantiation
//
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
/* Previous section
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
api
  .getCardsAndUserInfo()
  .then(([cardsData, userData]) => {
    console.log("User Data:", userData);
    console.log("Cards Data:", cardsData);

    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });

    userInfo.changeAvatar(userData.avatar);

    // Defensive check
    if (cardsData && Array.isArray(cardsData)) {
      section.renderItems(cardsData);
    } else {
      console.error("cardsData is not an array or undefined:", cardsData);
    }
  })
  .catch((err) => console.log(`Failed to load data: ${err}`));
/* Previous api.getCardsAndUserInfo()
  api
  .getCardsAndUserInfo()
  .then(([cardsData, userData]) => {
    console.log("User Data:", userData);
    console.log("Card Data:", cardsData);

    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });

    section.renderItems(cardsData);
  })
  .catch((err) => console.log(`Failed to load data: ${err}`));
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
// ModalWithForm Instantiation
//
const addCardModal = new ModalWithForm("#add-card-modal", (addCardData) => {
  addCardModal.renderLoading(true);
  handleAddCardModalSubmit(addCardData);
});

addCardModal.setEventListeners();
/* Previous addCardModal
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

const profileModal = new ModalWithForm("#profile-edit-modal", (profileData) => {
  profileModal.renderLoading(true);
  handleProfileModalSubmit(profileData);
});

profileModal.setEventListeners();
/* Previous profileModal
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
const avatarUpdateModal = new ModalWithForm(
  "#profile-avatar-modal",
  (avatarData) => {
    avatarUpdateModal.renderLoading(true);

    api
      .updateAvatar(avatarData.url)
      .then((res) => {
        userInfo.changeAvatar(res.avatar);
        avatarUpdateModal.close();
      })
      .catch((err) => console.error("Error updating profile image:", err))
      .finally(() => {
        avatarUpdateModal.renderLoading(false);
      });
  }
);
avatarUpdateModal.setEventListeners();

//
// ModalConfirmDelete Instantiation
//
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
    .catch((err) => console.error(`Failed to update users info: ${err}`))
    .finally(() => {
      profileModal.renderLoading(false);
    });
}

function handleAddCardModalSubmit(data) {
  api
    .createNewCard({ name: data.title, link: data.url })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);

      addCardModalForm.reset();

      addCardModal.close();
    })
    .catch((err) => console.error(`Failed to add card: ${err}`))
    .finally(() => {
      addCardModal.renderLoading(false);
    });
}
/* Previous handleAddCardModalSubmit
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

//
//Delete a Card using api.deleteCard method
//
function handleDeleteCard(card) {
  deleteConfirmation.open();
  deleteConfirmation.setDeleteConfirmation(() => {
    return api
      .deleteCard(card.getCardId())
      .then(() => {
        deleteConfirmation.close();
        card.removeCard();
      })
      .catch(console.error);
  });
}
/* Previouse handleDeleteCard
function handleDeleteCard(cardId) {
  deleteConfirmation.open();
  deleteConfirmation.setDeleteConfirmation(() => {
    api
      .deleteCard(cardId._id)
      .then(() => {
        deleteConfirmation.close();
        cardId.handleDeleteButton();
      })
      .catch(console.error);
  });
}
*/

//
//Like a Card using api.likeCard and api.dislikeCard methods
//
function handleLikeCard(card) {
  if (card.isLiked) {
    return api
      .dislikeCard(card.getCardId())
      .then(() => {
        card.setCardLikes(false);
      })
      .catch((err) => console.error("Failed to dislike card:", err));
  } else {
    return api
      .likeCard(card.getCardId())
      .then(() => {
        card.setCardLikes(true);
      })
      .catch(console.error);
  }
}
/* Previous handleLikeCard
function handleLikeCard(cardId) {
  if (cardId.isLiked) {
    api
      .dislikeCard(cardId)
      .then((res) => {
        cardId.setCardLikes(res.isLiked);
      })
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(cardId)
      .then((res) => {
        cardId.setCardLikes(res.isLiked);
      })
      .catch(console.error);
  }
}
  */

//
// Special Function: createCard
//
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
/* Previous createCard
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}
*/

//
// Event Listeners
//
addNewCardModalButton.addEventListener("click", () => {
  addCardModal.open();
  formValidators["add-card-modal-form"].resetValidation();
});

profileAvatarButton.addEventListener("click", () => {
  avatarUpdateModal.open();
  formValidators["update-avatar-modal-form"].resetValidation();
});

profileEditButton.addEventListener("click", () => {
  formValidators["profile-edit-modal-form"].resetValidation();

  const userData = userInfo.getUserInfo();

  profileModalTitleInput.value = userData.title || "";
  profileModalDescriptionInput.value = userData.description || "";

  profileModal.open();
});

/*PREVIOUS CODE FOR PERSONAL REFERENCE
//
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
