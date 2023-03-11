//класс Card, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
    constructor(data, templateSelector, handleCardClick, handleConfirmClick, handleCardLike, userId) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._cardId = data._id;
        this._handleCardClick = handleCardClick;
        this._handleConfirmClick = handleConfirmClick;

        this._handleCardLike = handleCardLike;

        this._likes = data.likes;
        this._likeCounter = data.likes.length;
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
            .addEventListener('click', () => {
                this._handleConfirmClick(this._cardId, this)
            });
        this._element
            .querySelector('.element__icon')
            .addEventListener('click', () => {
                this._handleCardLike(this._cardId);
                // this._element, this.toggleLike());
            })

        this._element
            .querySelector('.element__photo')
            .addEventListener('click', () => {
                this._getCardPopupImg();
            });
    }

    delete() {
        this._element.remove();
        this._element = null;
    }

    _getCardPopupImg = () => {
        this._handleCardClick(this._name, this._link)
    }
    //установка лайков
    setNumbersLike = (NumbersLike) => {
        this._likes = NumbersLike;
        this._counterLikes.textContent = this._likeCounter;
        this._toggleLikes()
    }
    // Метод проверки лайка
    isLiked() {
        return this._likes.find(user => user._id === this._userId);
    }

    _toggleLikes() {
        if (this.isLiked()) {
            this._buttonLikeCard.classList.add('element__icon_active')
        } else {
            this._buttonLikeCard.classList.remove('element__icon_active')
        }
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._buttonDeleteCard = this._element.querySelector('.element__icon-trash');
        this._buttonLikeCard = this._element.querySelector('.element__icon');
        this._counterLikes = this._element.querySelector('.element__numbers')

        if (this._userId !== this._ownerId) {
            this._buttonDeleteCard.remove();
        }

        this.setNumbersLike(this._likes)
        return this._element;
    }
}
