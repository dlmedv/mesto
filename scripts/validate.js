// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validationConfig = {
    formSelector: '.popup__form', // селектор формы
    inputSelector: '.popup__input', // селектор input
    submitButtonSelector: '.popup__button',// селектор кнопки submit
    inactiveButtonClass: 'popup__button_disabled',// состояние кнопки submit
    inputErrorClass: 'popup__input_type_error', // подчеркивание красным input
    errorClass: 'popup__error_visible'
};
//удаление ошибки
function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
}
// появление ошибки
function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
}
// функция валидации
function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
}
// проверка кнопки submite 
function setButtonState(popupElement) {
    const formElement = popupElement.querySelector(validationConfig.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
}

function clearInputError (popupElement) {
    const formElement = popupElement.querySelector(validationConfig.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement)=>{
        hideInputError(formElement, inputElement, validationConfig);
    })
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => (!inputElement.validity.valid));
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

// нашли все инпуты
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    //toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })
    })
}
// нашли все формы
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    })
}
enableValidation(validationConfig);