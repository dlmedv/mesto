
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig } from '../constants/constants.js';
import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js'
import PopupConfirmDelete from '../components/PopupConfirmDelete.js'

import {
     popupProfileOpenButton,
     formEditProfile, formAdd,
    nameInput, aboutInput,  profileAdd, 
    usersDataEdit, popupSelectors, options,
      popupButtonAvatar, formAvatar
} from '../utils/utils.js';
import Api from '../components/Api.js';

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
            if (card.isLike) {
                api.deleteLikes(cardId)
                .then((res) => {
                  card.setLikes(res.likes);
                  card.toggleIsLike();
                  card.toggleLike();
                })
                .catch((err) => {
                  console.log(err);
                });
              } else {
                  api.setLikes(cardId)
                  .then((res) => {
                      card.setLikes(res.likes);
                      card.toggleIsLike();
                      card.toggleLike();
                  })
                  .catch((err) => {
                      console.log(err);
                  });
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

// отображение информации о пользователи 
const userInfo = new UserInfo(usersDataEdit);


const popupAboutUsers = new PopupWithForm(
    popupSelectors.popupEditProfile,
    (userData) => {
        popupAboutUsers.changeText('Сохранение...')
        api.setInfoUser(userData)
            .then((res) => {
                userInfo.setUserInfo(res);
            })
            .then(() => {
                popupAboutUsers.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupAboutUsers.changeText('Сохранить');
                
            })
    },
);

const popupAddCard = new PopupWithForm(
    popupSelectors.popupAddCard,
    (item) => {
        popupAddCard.changeText('Сохранение...')
        api.createNewCard(item)
            .then((res) => {
                const card = createCard(res);
                cardList.addItem(card);
            })
            .then(() => {
                popupAddCard.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                popupAddCard.changeText('Сохранить')
            })
    });

const popupConfirmDeleteCard = new PopupConfirmDelete(
    popupSelectors.popupConfirmDelete,
    (cardId, cardItem,) => {
        popupConfirmDeleteCard.changeText('Удаление...')
        api.deleteCard(cardId)
            .then(() => {
                cardItem.remove();
            })
            .then(() => {
                popupConfirmDeleteCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupConfirmDeleteCard.changeText('Да')
            })

    }
)

const popupImage = new PopupWithImage(popupSelectors.popupWithImg);

//аватар пользователя
const popupUserAvatar = new PopupWithForm(
    popupSelectors.popupAvatar,
    (newAvatarLink) => {
        popupUserAvatar.changeText('Сохранение...')
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
            .finally(() => {
                popupUserAvatar.changeText('Сохранить')
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


















