import Popup from './Popup.js'

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, handleConfirmClick) {
        super(popupSelector);
        this._handleConfirmClick = handleConfirmClick.bind(this);
        this._button = this._popup.querySelector('.popup__button')
        this._form = this._popup.querySelector('.popup__form');
    }

    changeText(text) {
        this._button.textContent = text;
    }
    
    open(cardId, cardItem) {
        super.open();

        this._cardId = cardId;
        this._cardItem = cardItem;
    }

    setEventListeners() {
        super.setEventListeners();
       this._form
        .addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleConfirmClick(this._cardId, this._cardItem, this._button)
        })
    }
}