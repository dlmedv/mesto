export const popupPhoto = document.querySelector('.popup_photo');
export const popupTitlePhoto = document.querySelector('.popup__image');
export const popupLinkPhoto = document.querySelector('.popup__title-img');
export const popupProfileOpenButton = document.querySelector('.profile__edit');
export const popupEditProfile = document.querySelector('.popup_edit-card');
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
    name: name,
    about: about,
    avatar: avatar,
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

 export function changeButtonText(button, buttonText) {
    button.textContent = buttonText;
  }
/*
export function changeButtonText(isLoad, button, typeForm) {
    if (isLoad) {
        document.querySelector(button).disabled = true;

        if (typeForm) {
            button.textContent = 'Сохранение...';
        } else {
            button.textContent = 'Удаление...';
        }
    } else {
        document.querySelector(button).disabled = false;

        if (typeForm) {
            document.querySelector(button).textContent = 'Сохранить';
        } else {
            document.querySelector(button).textContent = 'Да';
        }
    }
} */




























//попап открытие 
export function openPopup(popupElement) {
    popupElement.classList.add('popup_active');
    document.addEventListener("keydown", closePopupEsc);
    document.addEventListener('click', closePopupOverflow);
};

export function openPopupImg(link, name) {
    openPopup(popupPhoto);
    popupTitlePhoto.src = name;
    popupTitlePhoto.alt = name;
    popupLinkPhoto.textContent = link;
}

//попап закрытие
export function closePopup(popupElement) {
    popupElement.classList.remove('popup_active')
    document.removeEventListener('keydown', closePopupEsc);
    document.removeEventListener('mousedown', closePopupOverflow);
}

// закрытие попап на esc
export function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupEsc = document.querySelector('.popup_active')
        closePopup(popupEsc);
    }
}

//закрытие на overflow
export function closePopupOverflow(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

