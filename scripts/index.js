import { openPopup } from './utils.js';
import Card from './Card.js';
import { initialCards } from './constants.js';
import FormValidator from './FormValidator.js';
import { validationConfig } from './constants.js';
import { closePopup } from './utils.js';

const popupProfileOpenButton = document.querySelector('.profile__edit');
const popupEditProfile = document.querySelector('.popup_edit-card');
const formEditProfile = document.querySelector('.popup__form');
const formAdd = document.querySelector('.popup__add-form');
const inputAddTitle = document.querySelector('.popup__input_type_title');
const inputAddLink = document.querySelector('.popup__input_type_link');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const profileAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_add-card');
const buttonsClose = document.querySelectorAll('.popup__close');

// добавление карточки
const createCard = (item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    return cardElement;
}

const addCard = (Card) => {
    elements.prepend(Card);
};

initialCards.forEach((item) => {
    addCard(createCard(item));
})

// сохранение данных в попап edit
function handleEditFormSubmit(evt) {
    evt.preventDefault(evt);
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', handleEditFormSubmit);

// добавление карточки через форму 
function handleAddFormSubmit(evt) {
    evt.preventDefault(evt);
    const item = {};
    item.name = inputAddTitle.value;
    item.link = inputAddLink.value;
    evt.target.reset()
    addCard(createCard(item));
    closePopup(popupAdd);
}
popupAdd.addEventListener('submit', handleAddFormSubmit);

//закрытие попапов 
buttonsClose.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.closest('.popup')
    closePopup(popup)
}));

popupProfileOpenButton.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.value = name.textContent;
    aboutInput.value = about.textContent;
    formValidEdit.clearInputError();
});

profileAdd.addEventListener('click', function () {
    openPopup(popupAdd);
    formValidAdd.setButtonState();
});

//валидация формы
const formValidAdd = new FormValidator(validationConfig, formAdd);
const formValidEdit = new FormValidator(validationConfig, formEditProfile);
formValidAdd.enableValidation();
formValidEdit.enableValidation();
