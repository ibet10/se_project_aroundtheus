export default class UserInfo {
  constructor({ titleSelector, descriptionSelector, avtarSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avtarSelector);
  }

  //Public method getUserInfo()
  getUserInfo() {
    //returns object containing user info
    return {
      //object with name and job
      title: this._titleElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  //Public method setUserInfo()
  setUserInfo({ title, description }) {
    //use after successful submission of the profile form
    this._titleElement.textContent = title;
    this._descriptionElement.textContent = description;
  }

  changeAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
