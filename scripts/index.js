import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

//Sprint 11
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupwithImage.js";

/*funcion render*/
function renderCard(data) {
  const card = new Card(data, "#cards__list-template", (data) => {
    PopupVerImagenes.open(data);
  });
  const cardElement = card.generateCard(data);
  SectionCards.addItem(cardElement);
}

/*Profile*/
const Profile = new UserInfo({
  profileName: ".profile__title",
  description: ".profile__description",
});

/*Formulario editar perfil*/
const editProfileOpenButton = document.querySelector(".profile__edit-button");

const profileForm = new PopupWithForm({
  PopupSelector: "#edit-popup",
  handleFormSubmit: (data) => {
    Profile.setUserInfo(data);
    profileForm.close();
  },
});
profileForm.setEventListeners();

editProfileOpenButton.addEventListener("click", () => {
  profileForm.open();
});

/*Seccion Cards*/
const PopupVerImagenes = new PopupWithImage("#image-popup");
PopupVerImagenes.setEventListeners();

const SectionCards = new Section(
  {
    items: initialCards,
    render: (data) => {
      renderCard(data);
    },
  },
  ".cards__list",
);
SectionCards.renderItems();

/*Formulario addCard*/
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardForm = new PopupWithForm({
  PopupSelector: "#new-card-popup",
  handleFormSubmit: (data) => {
    renderCard(data);
    addCardForm.close();
  },
});
addCardForm.setEventListeners();

addCardOpenButton.addEventListener("click", () => {
  addCardForm.open();
});

/*Validación de formularios*/
const formErrorSettings = {
  input: ".popup__input",
  button: ".popup__button",
  buttonDisabled: "button__disabled",
  showInputError: "popup__input-error_active",
};

//validador de entradas del formulario editProfile
const profileFormValidator = new FormValidator(
  formErrorSettings,
  profileForm._form,
);
profileFormValidator.setEventListeners();

const addCardFormValidator = new FormValidator(
  formErrorSettings,
  addCardForm._form,
);
addCardFormValidator.setEventListeners();
