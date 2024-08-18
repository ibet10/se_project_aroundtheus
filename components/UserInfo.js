//UserInfo Class
//export to index.js

/*
The UserInfo class is responsible for rendering information about the user on the page. 

This class should:

1. Take an object with the selectors of two elements into the constructor: 
 a. one for the profile’s name element and 
 b. one for its job element.

2. Have a public method named getUserInfo(), which returns an object containing information about the user. 
 a. this method will be handy for cases when it's necessary to display the user data in the open form.

3. Have a public method named setUserInfo(), which takes new user data and adds it to the page. 
 a. this method should be used after successful submission of the profile form.

(In index.js) Create an instance of the UserInfo class in index.js and use its methods as described.
*/
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
    };
  }

  //Public method setUserInfo()
  setUserInfo({ name, job }) {
    //use after successful submission of the profile form
  }
}
