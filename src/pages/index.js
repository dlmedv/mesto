
import Card from '../components/Card.js';
//import { initialCards } from '../constants/constants.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig } from '../constants/constants.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import PopupConfirmDelete from '../components/PopupConfirmDelete.js'

import {
    popupPhoto, popupTitlePhoto, popupLinkPhoto, popupProfileOpenButton,
    popupEditProfile, formEditProfile, formAdd, inputAddTitle, inputAddLink,
    nameInput, aboutInput, name, about, elements, profileAdd, popupAdd,
    buttonsClose, usersDataEdit, popupSelectors, options, buttonLoadingText, submitButton, popupButtonAvatar, formAvatar, inputAvatar
} from '../utils/utils.js';
import Api from '../components/Api.js';
import { changeButtonText } from '../utils/utils.js';
let userId;

const api = new Api(options);

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then((res) => {
        const InitialCards = res[0];
        const UserInfo = res[1];

        cardList.renderItems(InitialCards);

        userInfo.setUserInfo(UserInfo);
        userInfo.getUserId(UserInfo._id)
        userId = UserInfo._id
    })
    .catch((err) => {
        console.log(err);
    })

const createCard = (item) => {
    const card = new Card(item, '#element-template',
        () => { popupImage.open(item.link, item.name) },
        handleConfirmClick, 
        (cardId) => {
            if (card.isLiked()) {
                api.deleteLikes(cardId)
                .then(res => {
                  card.setNumbersLike(res.likes);
                })
                .catch((err) => {
                  console.log(err);
                });
              } else {
                api.setLikes(cardId)
                .then(res => {
                    card.setNumbersLike(res.likes);
                })
                .catch((err) => {
                  console.log(err);
                })
              }
        }
        ,userId)
    const cardElement = card.generateCard();
    return cardElement;
}

function handleConfirmClick(cardId, cardItem) {
    popupConfirmDeleteCard.open(cardId, cardItem)
}

const cardList = new Section(
    {
        renderer: (item) => {
            const card = createCard(item);
            cardList.addItem(card);
        }
    }
    , '.elements')
//cardList.renderItems() 

// отображение информации о пользователи 
const userInfo = new UserInfo(usersDataEdit);

const popupAboutUsers = new PopupWithForm(
    popupSelectors.popupEditProfile,
    (userData) => {
        popupAboutUsers.changeButtonText('Сохранение...')
        api.setInfoUser(userData)
            .then((res) => {
                userInfo.setUserInfo(res);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupAboutUsers.changeButtonText('Сохранить')
            })
    },
);

const popupAddCard = new PopupWithForm(
    popupSelectors.popupAddCard,
    (item) => {
        popupAddCard.changeButtonText('Сохранение...');
        api.createNewCard(item)
            .then((res) => {
                const card = createCard(res);
                cardList.addItem(card);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupAddCard.changeButtonText('Сохранить')
            })
    });

const popupConfirmDeleteCard = new PopupConfirmDelete(
    popupSelectors.popupConfirmDelete,
    (cardId, cardItem,) => {

        api.deleteCard(cardId)
            .then(() => {
                popupConfirmDeleteCard.changeButtonText('Удаление...')
            })
            .then(() => {
                cardItem.delete();
            })
            .then(() => {
                popupConfirmDeleteCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupConfirmDeleteCard.changeButtonText('Да')
            })

    }
)

const popupImage = new PopupWithImage(popupSelectors.popupWithImg);

//аватар пользователя
const popupUserAvatar = new PopupWithForm(
    popupSelectors.popupAvatar,
    (newAvatarLink) => {
        api.setUserAvatar(newAvatarLink.link)
            .then((res) => {
                userInfo.setUserInfo(res)
            })
            .then(() => {
                popupUserAvatar.close()
            })
            .catch((err) => {
                console.log(err);
            })
    }
)

//попап редактирования профиля
popupProfileOpenButton.addEventListener('click',
    (evt) => {
        evt.preventDefault();
        const { name, about } = userInfo.getUserInfo();
        nameInput.value = name;
        aboutInput.value = about;
        popupAboutUsers.open();
        formValidEdit.clearInputError();
    });
//попап добавления карточки
profileAdd.addEventListener('click',
    () => {
        popupAddCard.open();
        formValidAdd.setButtonState();
    });

popupButtonAvatar.addEventListener('click',
    () => {
        popupUserAvatar.open()
        formValidAvatar.setButtonState()
    }
)

popupAboutUsers.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupConfirmDeleteCard.setEventListeners();
popupUserAvatar.setEventListeners();

//валидация формы
const formValidAdd = new FormValidator(validationConfig, formAdd);
const formValidEdit = new FormValidator(validationConfig, formEditProfile);
const formValidAvatar = new FormValidator(validationConfig, formAvatar);
formValidAdd.enableValidation();
formValidEdit.enableValidation();
formValidAvatar.enableValidation();

















