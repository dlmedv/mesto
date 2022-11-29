const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');

editButton.addEventListener('click', function () {
    popup.classList.add('popup_active');
})

popupClose.addEventListener('click', function () {
    popup.classList.remove('popup_active');
})

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_name');
let aboutInput = document.querySelector('.popup__text_about');
let saveButton = document.querySelector('.popup__button');

function handleFormSubmit(evt) {
    evt.preventDefault(evt); // Эта строчка отменяет стандартную отправку формы.
    const name = document.querySelector('.profile__title');
    const about = document.querySelector('.profile__subtitle');

    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;// Получите значение полей aboutInput и nameInput из свойства value
}

formElement.addEventListener('submit', handleFormSubmit);

saveButton.addEventListener('click', function () {
    popup.classList.remove('popup_active');
})