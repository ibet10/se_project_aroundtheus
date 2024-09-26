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
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    };

    console.log("URL:", url);
    console.log("Options:", options);

    return this._request(url, options);
  }
  /*updateProfileInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    });
  }*/

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
