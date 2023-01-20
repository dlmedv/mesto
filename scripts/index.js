const editButton = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit-card');
const editForm = document.querySelector('.popup__form');
const formAdd = document.querySelector('.popup__add-form');
const inputAddTitle = document.querySelector('.popup__input_type_title');
const inputAddLink = document.querySelector('.popup__input_type_link');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const name = document.querySelector('.profile__title');
const about = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const addButton = document.querySelector('.profile__add');
const elementPhoto = document.querySelector('.element__photo');
const elementTitle = document.querySelector('.element__title');
const profileAdd = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_add-card');
const popupPhoto = document.querySelector('.popup_photo');
const popupTitlePhoto = document.querySelector('.popup__image');
const popupLinkPhoto = document.querySelector('.popup__title-img');
const closeButtons = document.querySelectorAll('.popup__close');
const template = document.querySelector('#element-template');

// добавление карточки
import Card from './Card.js';
import { initialCards } from './constants.js';

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
    closePopup(popupEdit);
}
editForm.addEventListener('submit', handleEditFormSubmit);

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

//попап открытие 
function openPopup(popupElement) {
    popupElement.classList.add('popup_active');
    document.addEventListener("keydown", closePopupEsc);
    document.addEventListener('click', closePopupOverflow);
};

editButton.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = name.textContent;
    aboutInput.value = about.textContent;
    formValidEdit.clearInputError();
});

profileAdd.addEventListener('click', function () {
    openPopup(popupAdd);
    formValidAdd.setButtonState();
});

export function openPopupImg(link, name) {
    openPopup(popupPhoto);
    popupTitlePhoto.src = name;
    popupTitlePhoto.alt = name;
    popupLinkPhoto.textContent = link;
}

//попап закрытие
function closePopup(popupElement) {
    popupElement.classList.remove('popup_active')
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('click', closePopupOverflow);
}

closeButtons.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.closest('.popup')
    closePopup(popup)
}));

// закрытие попап на esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupEsc = document.querySelector('.popup_active')
        closePopup(popupEsc);
    }
}

//закрытие на overflow
function closePopupOverflow(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

//валидация формы
import FormValidator from './FormValidator.js';
import { validationConfig } from './constants.js';

const formValidAdd = new FormValidator(validationConfig, formAdd);
const formValidEdit = new FormValidator(validationConfig, editForm);
formValidAdd.enableValidation();
formValidEdit.enableValidation();




/*
//создание карточки
const createCard = (cardTitle, cardLink) => {
    const cardElement = template.querySelector('.element').cloneNode(true);
    const cardElementPhoto = cardElement.querySelector('.element__photo');
    cardElementPhoto.src = cardLink;
    cardElementPhoto.alt = cardTitle;
    const cardElementTitle = cardElement.querySelector('.element__title')
    cardElementTitle.textContent = cardTitle;

    //кнопка удаление
    cardElement.querySelector('.element__icon-trash').addEventListener('click', function (evt) {
        evt.preventDefault();
        cardElement.remove();
    });

    //кнопка лайк
    cardElement.querySelector('.element__icon').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__icon_active');

    });

    //попап фото
    cardElementPhoto.addEventListener('click', function () {
        openPopup(popupPhoto);
        popupTitlePhoto.src = cardLink;
        popupTitlePhoto.alt = cardTitle;
        popupLinkPhoto.textContent = cardTitle;
    });

    return cardElement;
};

//добавление карточки
const addCard = (Card) => {
    elements.prepend(Card);
};
initialCards.forEach((item) => {
    addCard(createCard(item.name, item.link));
});*/
