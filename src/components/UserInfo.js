export default class UserInfo {
    constructor ({user, about }) {
        this._user = user;
        this._about = about;
    }

    getUserInfo = () => { // возвращаем объект с данными пользователя
       return {
        user: this._user.textContent,
        about: this._about.textContent,
        };
    }

    setUserInfo = (userData) => { // принимаем новые данные пользователя
        const {user, about} = userData;
        this._user.textContent = user;
        this._about.textContent = about;
    }
}