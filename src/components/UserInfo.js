export default class UserInfo {
    constructor ({name, about, avatar, _userId}) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
        this._userId = _userId;
    }

    getUserInfo = () => { // возвращаем объект с данными пользователя
       return {
        name: this._name.textContent,
        about: this._about.textContent,
        avatar: this._avatar.src,
        };
    }

    setUserInfo = (userData) => { // принимаем новые данные пользователя
        const {name, about, avatar, _userId} = userData;
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this._avatar.alt = name;
        this._userId = _userId;
    }

    getUserId() {
        return this._userId;
    }
}