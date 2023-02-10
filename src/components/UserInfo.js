export default class UserInfo {
    constructor ({profileNameUser, profileAboutUser}) {
        this._profileNameUser = profileNameUser;
        this._profileAboutUser = profileAboutUser;
    }

    getUserInfo = () => { // возвращаем объект с данными пользователя
       return {
        profileNameUser: this._profileNameUser.textContent,
        profileAboutUser: this._profileAboutUser.textContent,
        };
    }

    setUserInfo = (userData) => { // принимаем новые данные пользователя
        this._profileNameUser.textContent = userData.user;
        this._profileAboutUser.textContent = userData.about;
    }
}