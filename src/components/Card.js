//класс Card, который создаёт карточку с текстом и ссылкой на изображение

export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;

    }
    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
        return cardElement;
    }
    
    _setEventListeners = () => {
        this._element
            .querySelector('.element__icon-trash')
            .addEventListener('click', (evt) => {
                this._deleteCard(evt);
            });
        this._element
            .querySelector('.element__icon')
            .addEventListener('click', (evt) => {
                this._toggleCardLike(evt);
            })

        this._element
            .querySelector('.element__photo')
            .addEventListener('click', () => {
                this._getCardPopupImg();
            });
    }

    _deleteCard = (evt) => {
        evt.preventDefault();
        this._element.remove();
        this._element = null;
    }

    _toggleCardLike = (evt) => {
        evt.target.classList.toggle('element__icon_active');
    }

    _getCardPopupImg = () => {
        this._handleCardClick(this._name, this._link)
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        const elementPhoto = this._element.querySelector('.element__photo');
        elementPhoto.src = this._link;
        elementPhoto.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
}
