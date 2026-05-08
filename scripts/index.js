import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Sprint 11
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupwithImage.js";

//Sprint 12 API
import {
  loaded,
  userAPIGET,
  userAPIPATCH,
  cardsAPIGET,
  cardsAPIPOST,
} from "./API.js";

/*Profile*/
let usuario;
userAPIGET()
  .then((user) => {
    usuario = new UserInfo({
      profileName: user.name,
      profileAbout: user.about,
      profileAvatar: user.avatar,
    });
    usuario.setUser();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    loaded();
  });

/*Formulario editar perfil*/
const editProfileOpenButton = document.querySelector(".profile__edit-button");

const profileForm = new PopupWithForm({
  PopupSelector: "#edit-popup",
  handleFormSubmit: (data) => {
    userAPIPATCH(data);
    usuario.updateUserInfo(data);
    profileForm.close();
  },
});
profileForm.setEventListeners();

editProfileOpenButton.addEventListener("click", () => {
  profileForm.open();
});

/*render*/
function renderCard(data) {
  const card = new Card(data, "#cards__list-template", (data) => {
    PopupVerImagenes.open(data);
  });
  const cardElement = card.generateCard(data);
  SectionCards.addItem(cardElement);
}

/*Seccion Cards*/
let SectionCards;
cardsAPIGET().then((datos) => {
  console.log(datos);
  SectionCards = new Section(
    {
      items: datos,
      render: (data) => {
        renderCard(data);
      },
    },
    ".cards__list",
  );
  SectionCards.renderItems();
});

/*popUp imagenes*/
const PopupVerImagenes = new PopupWithImage("#image-popup");
PopupVerImagenes.setEventListeners();

/*Formulario addCard*/
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardForm = new PopupWithForm({
  PopupSelector: "#new-card-popup",
  handleFormSubmit: (data) => {
    cardsAPIPOST(data)
      .then((datos) => {
        renderCard(datos);
        addCardForm.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loaded();
      });
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
