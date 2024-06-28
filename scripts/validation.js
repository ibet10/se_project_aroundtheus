const configItems = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Add the inputs errors from the Card form
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputElement.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

//Hide the input errors from the Card form
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

//ADD FEATURE FOR CLICKING OFF MODAL AND USING Esc KEY TO ENTER MODAL DATA

function checkInputValidity(formElement, inputElement, optionInputs) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, optionInputs);
  } else {
    hideInputError(formElement, inputElement, optionInputs);
  }
}

function setEventListerners(formElement, optionInputs) {
  const { inputSelector } = optionInputs;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  // console.log(inputElements);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (e) => {
      checkInputValidity(formElement, inputElement, optionInputs);
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
