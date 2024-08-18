//PopupWithImage Class
//export to index.js

/*
The (Modal)PopupWithImage class should be a child class of (Modal)Popup (extends). 

This class will need to override the parent’s open() method. 
The open() method of the (Modal)PopupWithImage class will need:
--to accept the name and link of the card as arguments
--and add an image to the popup and the corresponding image src attribute 
--along with a caption for the image. 

This method should be called in your image click handler in index.js.

Here’s an example of what the method declaration might look like:
// data should be an object containing the name and link
open(data) {
   // set the image's src and alt
   // set the caption's textContent
   super.open();
 }

(In index.js) Create one instance of this class in index.js and call its parent’s setEventListeners() method.
*/

//IMPORT THE MODAL CLASS
export default class ModalWithImage extends Modal {
  constructor() {}

  open({ name, link }) {
    // set the image's src and alt
    // set the caption's textContent
    super.open();
  }
}
