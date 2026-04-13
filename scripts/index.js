import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/*Confirguracion Validar formularios*/
const formErrorSettings = {
  input: ".popup__input",
  button: ".popup__button",
  buttonDisabled: "button__disabled",
  inputErrorText: "popup__input_type_error",
  showError: "popup__input-error_active",
};

/*Cerrar PopUps*/
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_is-opened")) {
      closeModal(popup);
    }

    if (event.target.classList.contains("popup__close")) {
      closeModal(popup);
    }
  });
});

/*Lista de Cards*/
const cardsList = document.querySelector(".cards__list");

function renderCard(object, container) {
  const cardClass = new Card(object, "#cards__list-template");
  const cardElement = cardClass.generateCard();

  container.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item, cardsList);
});

/*Profile*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*Formulario Editar perfil*/
const editProfileFormPopUp = document.querySelector("#edit-popup");
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonCloseEditProfile =
  editProfileFormPopUp.querySelector(".popup__close");

const profileForm = editProfileFormPopUp.querySelector("#edit-profile-form");
const inputProfileName = profileForm.querySelector(".popup__input_type_name");
const inputProfileDescription = profileForm.querySelector(
  ".popup__input_type_description",
);

function HandleOpenEditForm() {
  openModal(editProfileFormPopUp);
  profileForm.reset();
  profileFormValidator.resetValidator();
}

buttonOpenEditProfile.addEventListener("click", HandleOpenEditForm);
buttonCloseEditProfile.addEventListener("click", () => {
  closeModal(editProfileFormPopUp);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(editProfileFormPopUp);
});
/*form validator*/
const profileFormValidator = new FormValidator(formErrorSettings, profileForm);
profileFormValidator.setEventListeners();

/*formulario nueva carta*/
const addCardPopUp = document.querySelector("#new-card-popup");

const addCardForm = addCardPopUp.querySelector("#new-card-form");
const inputCardName = addCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = addCardForm.querySelector(".popup__input_type_url");

const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCard = addCardPopUp.querySelector(".popup__close");

function handleOpenAddCardForm() {
  openModal(addCardPopUp);
  addCardForm.reset();
  addCardFormValidator.resetValidator();
}

buttonOpenAddCard.addEventListener("click", handleOpenAddCardForm);
buttonCloseAddCard.addEventListener("click", () => {
  closeModal(addCardPopUp);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = inputCardName.value;
  const link = inputCardLink.value;
  const object = { name, link };
  renderCard(object, cardsList);
  closeModal(addCardPopUp);
}
addCardForm.addEventListener("submit", handleCardFormSubmit);

/*form validator*/
const addCardFormValidator = new FormValidator(formErrorSettings, addCardForm);
addCardFormValidator.setEventListeners();
