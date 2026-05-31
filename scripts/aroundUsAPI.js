export default class aroundUSAPI {
  constructor({ baseUrl, headers, loaderScreen }) {
    this._url = baseUrl;
    this._headers = headers;
    this._loader = loaderScreen;
  }

  //cargando...
  _loading() {
    this._loader.classList.add("loader__visible");
  }
  loaded() {
    this._loader.classList.remove("loader__visible");
  }
  //manejar respuesta...
  _checkResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Error:${response.status}`);
  }

  //fetchs
  //usuario
  getUserInfo() {
    this._loading();
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  updateUserInfo(data) {
    this._loading();
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.profileName,
        about: data.profileAbout,
      }),
    })
      .then((response) => this._checkResponse(response))
      .catch((error) => console.log(error))
      .finally(() => this.loaded());
  }

  updateUserAvatar(data) {
    this._loading();
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    })
      .then((response) => this._checkResponse(response))
      .catch((error) => console.log(error))
      .finally(() => this.loaded());
  }

  //Cards
  getCards() {
    this._loading();
    return fetch(`${this._url}/cards/`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  postCard(data) {
    this._loading();
    return fetch(`${this._url}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.cardName,
        link: data.cardLink,
      }),
    }).then((response) => this._checkResponse(response));
  }

  cardToggleLike(id, isLiked) {
    const metodo = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: metodo,
      headers: this._headers,
    }).then((response) => response.json());
  }

  cardDelete(id) {
    fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }
}
