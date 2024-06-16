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

// Profile Modal Elements

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

// Card Template Elements

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Add Card Modal Elements

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardModalButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = document.querySelector(
  "#add-card-modal-button-close "
);
const addCardModalForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = addCardModalForm.querySelector(
  ".modal__input_type_title"
);
const addCardUrlInput = addCardModalForm.querySelector(
  ".modal__input_type_url"
);

// Preview Image Modal Elements

const previewImageModal = document.querySelector("#preview-image-modal");
const previewModalImageEl = previewImageModal.querySelector(
  ".modal__preview-image"
);
const previewModalCaptionEl =
  previewImageModal.querySelector(".modal__caption");

//Functions

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

//Event Handlers

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
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closeModal(addCardModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  //find delete button (trashbin)

  //add the event listener to the delete button
  //cardElement.remove();

  //add click listener to the cardImage element
  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = cardData.link;
    previewModalCaptionEl.textContent = cardData.name;
    openModal(previewImageModal);
  });
  //openModal with previewImageModal (find this element up at the top with the other variables)

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

//Event Listeners

profileEditModalForm.addEventListener("submit", handleProfileModalSubmit);
addCardModalForm.addEventListener("submit", handleAddCardModalSubmit);

profileEditButton.addEventListener("click", () => {
  profileModalTitleInput.value = profileTitle.textContent;
  profileModalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModalPopup);
});

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModalPopup)
);

addNewCardModalButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
