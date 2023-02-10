
import Card from '../components/Card.js';
import { initialCards } from '../constants/constants.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../constants/constants.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import {
    popupPhoto, popupTitlePhoto, popupLinkPhoto, popupProfileOpenButton,
    popupEditProfile, formEditProfile, formAdd, inputAddTitle, inputAddLink,
    nameInput, aboutInput, name, about, elements, profileAdd, popupAdd,
    buttonsClose,
} from '../utils/utils.js';

const cardList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '#element-template',
                () => { popupImage.open(item.link, item.name) });
            const cardElement = card.generateCard();

            cardList.addItem(cardElement);
        }
    }
    , '.elements')
cardList.renderItems()

// отображение информации о пользователи 
const userInfo = new UserInfo({
    profileNameUser: nameInput,
    profileAboutUser: aboutInput
});


const popupAboutUsers = new PopupWithForm(
    popupEditProfile,
    (userData) => {
        userInfo.setUserInfo(userData);
    }
);

const popupAddCard = new PopupWithForm(
    popupAdd,
    (item) => {
        const card = new Card(item, '#element-template',
            () => { popupImage.open(item.link, item.name) });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);

    });

const popupImage = new PopupWithImage(popupPhoto);

//попап редактирования профиля
popupProfileOpenButton.addEventListener('click',
    (evt) => {
        evt.preventDefault();
        userInfo.getUserInfo();
        nameInput.value = name.textContent;
        aboutInput.value = about.textContent;
        popupAboutUsers.open();
        formValidEdit.clearInputError();
    });
//попап добавления карточки
profileAdd.addEventListener('click',
    () => {
        popupAddCard.open();
        formValidAdd.setButtonState();
    });

popupAboutUsers.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();

//валидация формы
const formValidAdd = new FormValidator(validationConfig, formAdd);
const formValidEdit = new FormValidator(validationConfig, formEditProfile);
formValidAdd.enableValidation();
formValidEdit.enableValidation();


















