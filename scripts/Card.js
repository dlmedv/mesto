//класс Card, который создаёт карточку с текстом и ссылкой на изображение
import { openPopupImg } from "./index.js";

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;

    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)
        return cardElement;
    }
    _setEventListeners() {
        this._element
            .querySelector('.element__icon-trash')
            .addEventListener('click', (evt) => {
                evt.preventDefault();
                this._element.remove();
            });
        this._element
            .querySelector('.element__icon')
            .addEventListener('click', (evt) => {
                evt.target.classList.toggle('element__icon_active');
            })

        this._element
            .querySelector('.element__photo')
            .addEventListener('click', () => {
                this._getCardPopupImg();
            });
    }

    _getCardPopupImg() {
        openPopupImg(this._name, this._link)
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
}
