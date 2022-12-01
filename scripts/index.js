const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');

function openButton() {
    popup.classList.add('popup_active');
    nameInput.value = name.textContent;
    aboutInput.value = about.textContent;
}

function closeButton() {
    popup.classList.remove('popup_active');
}

function handleFormSubmit(evt) {
    evt.preventDefault(evt); // Эта строчка отменяет стандартную отправку формы.
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;// Получите значение полей aboutInput и nameInput из свойства value
    closeButton();
}

editButton.addEventListener('click', openButton);
popupClose.addEventListener('click', closeButton);
formElement.addEventListener('submit', handleFormSubmit);
