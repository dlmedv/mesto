const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
const formAdd = document.querySelector('.popup__add-form');
const inputAddTitle = document.querySelector('.popup__input_type_title');
const inputAddLink = document.querySelector('.popup__input_type_link');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
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
const closeButtons = document.querySelectorAll('.popup__close')
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//новый массив
const arrayCards = initialCards.map(function (item) {
    return {
        name: item.name,
        link: item.link,
    }
})

//создание карточки
const createCards = (cardTitle, cardLink) => {
    const template = document.querySelector('#element-template').content;
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
const addCards = (Card) => {
    elements.prepend(Card);
}
arrayCards.forEach((item) => {
    addCards(createCards(item.name, item.link));
});

//попап открытие 
function openPopup(popupElement, title, link) {
    popupElement.classList.add('popup_active');
    nameInput.value = title;
    aboutInput.value = link;
}

editButton.addEventListener('click', function () {
    openPopup(popup, name.textContent, about.textContent)

});

profileAdd.addEventListener('click', function () {
    openPopup(popupAdd)

});

//попап закрытие
function closeButton(elementClose) {
    elementClose.classList.remove('popup_active')
}

closeButtons.forEach(btn => btn.addEventListener('click', () => {
    const popup = btn.closest('.popup')
    closeButton(popup)
}));

// сохранение данных в попап edit
function handleFormSubmit(evt) {
    evt.preventDefault(evt);
    name.textContent = nameInput.value;
    about.textContent = aboutInput.value;
    closeButton(popup);
}
formElement.addEventListener('submit', handleFormSubmit);

// добавление карточки через форму 
function FormSubmitAdd(evt) {
    evt.preventDefault(evt);
    const inputTitle = inputAddTitle.value;
    const inputLink = inputAddLink.value;
    inputAddTitle.value = "";
    inputAddLink.value = "";
    addCards(createCards(inputTitle, inputLink));
    closeButton(popupAdd);
}
popupAdd.addEventListener('submit', FormSubmitAdd);










