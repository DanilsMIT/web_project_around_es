export default class UserInfo {
  constructor({ profileName, description }) {
    this._profileName = document.querySelector(profileName);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    return {
      profile_name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.profileName;
    this._description.textContent = data.description;
  }
}
