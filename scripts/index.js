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

console.log(initialCards);

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModalPopup = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModalPopup.querySelector(
  "#modal-button-close"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileModalTitleInput =
  profileEditModalPopup.querySelector("#modal-title-input");
const profileModalDescriptionInput = profileEditModalPopup.querySelector(
  "#modal-description-input"
);
const profileEditModalForm =
  profileEditModalPopup.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Functions

function closePopup() {
  profileEditModalPopup.classList.remove("modal_opened");
}

/*
clone the template element with all its content and store it in a cardElement variable
access the card title and image and store them in variables
set the path to the image to the link field of the object
set the image alt text to the name field of the object
set the card title to the name field of the object, too
return the ready HTML element with the filled-in data
*/

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.src = cardData.name;

  return cardElement;
}

//Event Handlers

function handleProfileModalSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileModalTitleInput.value;
  profileDescription.textContent = profileModalDescriptionInput.value;
  closePopup();
}

//Event Listeners

profileEditButton.addEventListener("click", () => {
  profileModalTitleInput.value = profileTitle.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
  profileEditModalPopup.classList.add("modal_opened");
});

profileModalCloseButton.addEventListener("click", closePopup);

profileEditModalForm.addEventListener("submit", handleProfileModalSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
