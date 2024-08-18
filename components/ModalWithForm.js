//PopupWithForm Class

//export to index.js

/*
The PopupWithForm should be a child of Popup, and it should comply with the following requirements:

It accepts two arguments: the popup selector and a callback function, which PopupWithForm calls when the form’s submit event fires.

It has a private method named _getInputValues(), which collects data from all the input fields and returns it as an object. 

This data should then be passed to the submission handler as an argument.

It overrides the setEventListeners() parent method. 

The setEventListeners() method of the PopupWithForm class should 
add a submit event listener to the form and call the setEventListeners() method of the parent class.

Create an instance of the PopupWithForm class for each popup that contains a form, and call their setEventListeners() method.

*/
