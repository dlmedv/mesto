export const popupPhoto = document.querySelector('.popup_photo');
export const popupTitlePhoto = document.querySelector('.popup__image');
export const popupLinkPhoto = document.querySelector('.popup__title-img');
export const popupProfileOpenButton = document.querySelector('.profile__edit');
export const popupEditProfile = document.querySelector('.popup_edit-card');
export const buttonAboutUser = popupEditProfile.querySelector('.popup__button')
export const formEditProfile = document.querySelector('.popup__form');
export const formAdd = document.querySelector('.popup__add-form');
export const inputAddTitle = document.querySelector('.popup__input_type_title');
export const inputAddLink = document.querySelector('.popup__input_type_link');
export const nameInput = document.querySelector('.popup__input_type_name');
export const aboutInput = document.querySelector('.popup__input_type_about');
export const name = document.querySelector('.profile__title');
export const about = document.querySelector('.profile__subtitle');
export const elements = document.querySelector('.elements');
export const profileAdd = document.querySelector('.profile__add');
export const popupAdd = document.querySelector('.popup_add-card');
export const buttonsClose = document.querySelectorAll('.popup__close');
export let userId 
export const popupButtonAvatar = document.querySelector('.profile__icon-edit');
export const formAvatar = document.querySelector('.popup__avatar-form');
export const inputAvatar = document.querySelector('.popup__input_type_avatar')
export const usersDataEdit = {
    name: '.profile__title',
    about: '.profile__subtitle',
    avatar: '.profile__avatar',
};

export const popupSelectors = {
    popupAddCard: '.popup_add-card',
    popupEditProfile: '.popup_edit-card',
    popupWithImg: '.popup_photo',
    popupConfirmDelete: '.popup_delete-card',
    popupAvatar: '.popup_avatar'
}

export const options = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: 'e24dd49a-4101-455b-9fb5-311038dfd707',
        'Content-Type': 'application/json'
    }
}





