//export to index.js
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async _request(url, options) {
    const res = await fetch(url, options);
    return this._checkRequest(res);
  }

  /*Cards should be rendered after the user information is received from the server. 
Сreate a function in Api.js and return the Promise.all() method. 
Pass the array of function calls for getting user information 
and the list of cards to Promise.all() as a parameter. */
  getCardsAndUserInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  /* User routes */
  //GET /users/me – Get the current user’s info
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }
  //PATCH /users/me – Update your profile information
  updateProfileInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }
  //PATCH /users/me/avatar – Update avatar
  updateAvatar(url) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: url }),
    });
  }

  /* Card routes */
  //GET /cards – Get all cards
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }
  //POST /cards – Create a card
  createNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }
  //DELETE /cards/:cardId – Delete a card
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
  //PUT /cards/:cardId/likes – Like a card
  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }
  //DELETE /cards/:cardId/likes – Dislike a card
  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
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
