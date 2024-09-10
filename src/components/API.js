//export to index.js
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async _result(url, options) {
    const res = await fetch(url, options);
    return this._checkResult(res);
  }
  /* User routes */
  //GET /users/me – Get the current user’s info
  getUserInfo() {}
  //PATCH /users/me – Update your profile information
  updateProfileInfo() {}
  //PATCH /users/me/avatar – Update avatar
  updateAvatar() {}

  /* Card routes */
  //GET /cards – Get all cards
  getInitialCards() {}
  //POST /cards – Create a card
  createNewCard() {}
  //DELETE /cards/:cardId – Delete a card
  deleteCard() {}
  //PUT /cards/:cardId/likes – Like a card
  likeCard() {}
  //DELETE /cards/:cardId/likes – Dislike a card
  deleteCard() {}
}

/*
Here is the address for the "Around the U.S." project server:
https://around-api.en.tripleten-services.com/v1.

Personal Token
{"user":{"name":"Placeholder name",
"about":"Placeholder description",
"avatar":"https://practicum-content.s3.amazonaws.com/resources/avatar_placeholder_1704989734.svg",
"_id":"89432f9019f102e3e475ba50"},
"token":"5457953a-b073-4cb8-8a6a-6ab24a852af5"}
*/
