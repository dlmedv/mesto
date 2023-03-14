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
        this._isLike = false;
        this._likes = data.likes;
    }

    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
        return cardElement;
    }


      //Работа кнопки "лайк"
      _clickLikeButton() {
        this._buttonLikeCard.classList.toggle('element__icon_active')
    }

    get isLike() {
        return this._isLike;
    }

    //метод получения лайков 
    getLikes(likes) {
        this._likes = likes; //в переменную получаем новое кол-во лайков
        this._counterLikes.textContent = this._likes.length;; //записываем это кол-во в ячейку
    }

    //метод переключения кнопки
    toggleLike() {
        this._buttonLikeCard.classList.toggle('element__icon_active');
    }

    //метод для переключения булевых значений
    toggleIsLike(){
        this._isLike = !this._isLike;
    }

    _setEventListeners = () => {

       this._buttonLikeCard = this._element.querySelector('.element__icon');

        this._element
            .querySelector('.element__icon-trash')
            .addEventListener('click', () => {
                this._handleConfirmClick(this._cardId, this._element)
            });

        this._buttonLikeCard.addEventListener('click', () => {
                this._handleCardLike(this._cardId, this);
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

    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementPhoto.src = this._link;
        this._elementPhoto.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        this._buttonDeleteCard = this._element.querySelector('.element__icon-trash');
        this._buttonLikeCard = this._element.querySelector('.element__icon');
        this._counterLikes = this._element.querySelector('.element__numbers');
        this._counterLikes.textContent = this._likes.length;

        if (this._userId !== this._ownerId) {
            this._buttonDeleteCard.remove();
        }

         //Добавляем проверку есть ли у карточки лайк или нет
         if (this._likes.find(item => item._id === this._userId)) {
            this._buttonLikeCard.classList.add('element__icon_active');
            this._isLike = true;
        }

        return this._element;
    }
}
