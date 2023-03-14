import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit; //колбек самбита формы
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this._button = this._popup.querySelector('.popup__button');
    }

    changeText(text) {
    this._button.textContent = text;
   }

    _getInputValues() {
         this._inputsValues = {};
        this._inputs.forEach((inputs) => {
            this._inputsValues[inputs.name] = inputs.value;
        })
        return this._inputsValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        }) 
    }

    close() {
        super.close();
        this._form.reset();
    }
}