import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit; //колбек самбита формы
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
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
        
        this._form.addEventListener('submit', () => {
            this._formSubmit(this._getInputValues());

            this.close();
        }) 
    }

    close() {
        super.close();

        this._form.reset();
    }
}