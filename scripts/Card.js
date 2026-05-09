export default class Card {
  constructor(
    object,
    template,
    handleImagenClick,
    handleDeleteClick,
    handleLikeClick,
  ) {
    this._iD = object._id;
    this._like = object.isLiked;
    this._title = object.name || object.cardName;
    this._link = object.link || object.cardLink;
    this._template = template;
    this._handleImagenClick = handleImagenClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardTemplate;
  }

  _likeButton() {
    return this._element.querySelector(".card__like-button");
  }

  _likeToggleButton() {
    this._likeButton().classList.toggle("card__like-button_is-active");
  }

  _iSiTliked() {
    const like = this._likeButton();

    if (this._like) {
      like.classList.add("card__like-button_is-active");
    } else {
      like.classList.remove("card__like-button_is-active");
    }
  }

  removeButtonFunction() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this._iD, this._like);
        this._likeToggleButton();
        this._like = !this._like;
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImagenClick({ name: this._title, link: this._link });
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._iSiTliked();

    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    cardTitle.textContent = this._title;
    cardImage.alt = this._title;
    cardImage.src = this._link;

    return this._element;
  }
}
