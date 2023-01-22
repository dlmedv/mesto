const popupPhoto = document.querySelector('.popup_photo');
const popupTitlePhoto = document.querySelector('.popup__image');
const popupLinkPhoto = document.querySelector('.popup__title-img');

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

