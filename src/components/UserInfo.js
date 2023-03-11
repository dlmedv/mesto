export default class UserInfo {
    constructor ({name, about, avatar, _userId}) {
        this._name = name;
        this._about = about;
        this._avatar = avatar;
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
        const {name, about, avatar} = userData;
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar;
        this._avatar.alt = name;
    }

    getUserId() {
        return this._userId;
    }
}