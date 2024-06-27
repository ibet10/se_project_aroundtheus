const configItems = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function setEventListerners(formElement, optionInputs) {
  const { inputSelector } = optionInputs;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  // console.log(inputElements);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      console.log(inputElement.validationMessage);
    });
  });
}

function enableValidation(optionInputs) {
  const formElements = [...document.querySelectorAll(configItems.formSelector)];
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListerners(formElement, optionInputs);
    //console.log(formElements);
  });
}

enableValidation(configItems);
