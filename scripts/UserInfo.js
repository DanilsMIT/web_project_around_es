export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._name = profileName;
    this._about = profileAbout;
    this._avatar = profileAvatar;
    this._profileName = document.querySelector(".profile__title");
    this._profileAbout = document.querySelector(".profile__description");
    this._profileAvatar = document.querySelector(".profile__image");
  }

  setUser() {
    this._profileName.textContent = this._name;
    this._profileAbout.textContent = this._about;
    this._profileAvatar.src = this._avatar;
  }

  updateUserInfo(data) {
    this._profileName.textContent = data.profileName;
    this._profileAbout.textContent = data.profileAbout;
  }
}
