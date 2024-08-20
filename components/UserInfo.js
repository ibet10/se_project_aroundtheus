//export to index.js

export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  //Public method getUserInfo()
  getUserInfo() {
    //returns object containing user info
    return {
      //object with name and job
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  //Public method setUserInfo()
  setUserInfo({ name, job }) {
    //use after successful submission of the profile form
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
