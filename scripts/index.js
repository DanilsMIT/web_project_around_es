import Card from "./Card.js";
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

/*Cerrar PopUps Cards*/
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

/*Formulario Editar perfil*/
const editProfileFormPopUp = document.querySelector("#edit-popup");
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");

/*profile*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

/*formulario edit profile*/
const profileForm = editProfileFormPopUp.querySelector("#edit-profile-form");
const inputProfileName = profileForm.querySelector(".popup__input_type_name");
const inputProfileDescription = profileForm.querySelector(
  ".popup__input_type_description",
);
const profileInputs = profileForm.querySelectorAll(".popup__input");
const profileFormButton = profileForm.querySelector(".popup__button");

profileInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(input);
    toggleButtonState(profileInputs, profileFormButton);
  });
});

const buttonCloseEditProfile =
  editProfileFormPopUp.querySelector(".popup__close");

function HandleOpenEditForm() {
  openModal(editProfileFormPopUp);
  profileForm.reset();
  profileInputs.forEach((input) => {
    checkInputValidity(input);
    toggleButtonState(profileInputs, profileFormButton);
  });
}

buttonOpenEditProfile.addEventListener("click", HandleOpenEditForm);

buttonCloseEditProfile.addEventListener("click", () => {
  closeModal(editProfileFormPopUp);
});
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  inputSubmit(evt, profileInputs);
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(editProfileFormPopUp);
});

/* pop-up de imagen*/

/*formulario nueva carta*/
const addCardPopUp = document.querySelector("#new-card-popup");

const addCardForm = addCardPopUp.querySelector("#new-card-form");
const inputCardName = addCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = addCardForm.querySelector(".popup__input_type_url");

const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCard = addCardPopUp.querySelector(".popup__close");

const cardFormInputs = addCardForm.querySelectorAll(".popup__input");
const cardFormButton = addCardForm.querySelector(".popup__button");

cardFormInputs.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(input);
    toggleButtonState(cardFormInputs, cardFormButton);
  });
});

function handleOpenAddCardForm() {
  openModal(addCardPopUp);
  addCardForm.reset();
  cardFormInputs.forEach((input) => {
    checkInputValidity(input);
    toggleButtonState(cardFormInputs, cardFormButton);
  });
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
  inputSubmit(evt, cardFormInputs);
  closeModal(addCardPopUp);
}

addCardForm.addEventListener("submit", handleCardFormSubmit);
