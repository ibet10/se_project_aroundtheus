export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleLikeCard,
    handleDeleteCard
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._cardElement = this._getTemplate();

    // Class fields for the elements that will be reused
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(
      "#card-trash-bin-button"
    );

    // Set the content of the card
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
  }

  // Method to get the card template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // Method to get card Id
  getCardId() {
    return this._id;
  }

  // 1. _setEventListeners method that sets the necessary event listeners
  _setEventListeners() {
    // a. ".card__image"
    if (this._cardImage) {
      this._cardImage.addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
    }
    // b. ".card__like-button"
    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeButton();
      });
    }
    // c. "#card-trash-bin-button"
    if (this._trashButton) {
      this._trashButton.addEventListener("click", () => {
        this._handleDeleteButton();
      });
    }
  }

  // 2. Public methods for the like and the delete button handlers
  handleLikeButton() {
    this._handleLikeCard(this);
  }

  handleDeleteButton() {
    if (this._handleDeleteCard) {
      this._handleDeleteCard(this)
        .then(() => {
          this._cardElement.remove();
          this._cardElement = null;
        })
        .catch((err) => console.error("Failed to delete card:", err));
    }
  }

  // 3. Public method that returns a fully functional card element populated with the appropriate data
  getView() {
    return this._cardElement;
  }
}

/* 
Previous Card Class

export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._cardElement = this._getTemplate();

    // Class fields for the elements that will be reused
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(
      "#card-trash-bin-button"
    );

    // Set the content of the card
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();
  }

  // Method to get the card template
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //1. _setEventListeners method that sets the necessary event listeners
  _setEventListeners() {
    // a. ".card__image"
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    // b. ".card__like-button"
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // c. "#card-trash-bin-button"
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });
  }
  //2. Private methods for the like and the delete button handlers
  // handle the like button click
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // handle the delete button click
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // 3. Public method that returns a fully functional card element populated with the appropriate data
  getView() {
    return this._cardElement;
  }
}

*/
