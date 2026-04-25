export default class Card {
  constructor(object, template, handleCardClick) {
    this._title = object.name;
    this._link = object.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _likeButtonFunction() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _removeButtonFunction() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._likeButtonFunction();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._removeButtonFunction();
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._title, link: this._link });
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    cardTitle.textContent = this._title;
    cardImage.alt = this._title;
    cardImage.src = this._link;

    return this._element;
  }
}
