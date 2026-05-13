import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Sprint 11
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupDelete from "./PopupDelete.js";

//Sprint 12 API
import aroundUSAPI from "./aroundUsAPI.js";

//constantes
import {
  editarAvatarFormularioPopup,
  editarPerfilFormularioPopup,
  verImagenPopUp,
  eliminarCartaPopup,
  agregarCartaPopup,
  paginaloader,
} from "./constPopUps.js";

//API
const aroundUsAPI = new aroundUSAPI({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "6e8faee7-cb36-424e-8723-26d1925bd141",
    "Content-Type": "application/json",
  },
  loaderScreen: paginaloader,
});

/////Section Profile
/*Profile*/
let usuario;
aroundUsAPI
  .getUserInfo()
  .then((datosAPI) => {
    usuario = new UserInfo({
      profileName: datosAPI.name,
      profileAbout: datosAPI.about,
      profileAvatar: datosAPI.avatar,
    });
    usuario.setUser();
  })
  .catch((error) => console.log(error))
  .then(() => aroundUsAPI.loaded());

/*Formulario cambiar foto de perfil*/
const editprofileAvatar = document.querySelector("#editprofileAvatar");

const avatarForm = new PopupWithForm({
  PopupSelector: editarAvatarFormularioPopup,
  handleFormSubmit: (inputs) => {
    aroundUsAPI.updateUserAvatar(inputs);
    usuario.updateAvatar(inputs);
    avatarForm.close();
  },
});
avatarForm.setEventListeners();
editprofileAvatar.addEventListener("click", () => {
  avatarForm.open();
});

/*Formulario editar perfil*/
const editProfileOpenButton = document.querySelector(".profile__edit-button");

const profileForm = new PopupWithForm({
  PopupSelector: editarPerfilFormularioPopup,
  handleFormSubmit: (inputs) => {
    aroundUsAPI.updateUserInfo(inputs);
    usuario.updateInfo(inputs);
    profileForm.close();
  },
});
profileForm.setEventListeners();

editProfileOpenButton.addEventListener("click", () => {
  profileForm.open();
});

//////Section Cards
/*popUp imagenes*/
const PopupVerImagenes = new PopupWithImage(verImagenPopUp);
PopupVerImagenes.setEventListeners();

/*popUp delete*/
const PopupDeleteCard = new PopupDelete(eliminarCartaPopup);
PopupDeleteCard.setEventListeners();

/*renderizar Card*/
function renderCard(data) {
  const card = new Card(
    data,
    "#cards__list-template",
    (data) => {
      PopupVerImagenes.open(data);
    },
    (thisItem) => {
      PopupDeleteCard.open(() => {
        aroundUsAPI.cardDelete(thisItem._iD);
        thisItem.removeButtonFunction();
        PopupDeleteCard.close();
      });
    },
    (id, isLiked) => {
      aroundUsAPI.cardToggleLike(id, isLiked);
    },
  );
  const cardElement = card.generateCard(data);
  SectionCards.addItem(cardElement);
}

/*List Cards*/
let SectionCards;
aroundUsAPI
  .getCards()
  .then((datosAPI) => {
    SectionCards = new Section(
      {
        items: datosAPI,
        render: (data) => {
          renderCard(data);
        },
      },
      ".cards__list",
    );
    SectionCards.renderItems();
  })
  .catch((error) => console.log(error))
  .then(() => aroundUsAPI.loaded());

/*Formulario añadir Card*/
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardForm = new PopupWithForm({
  PopupSelector: agregarCartaPopup,
  handleFormSubmit: (inputs) => {
    aroundUsAPI
      .postCard(inputs)
      .then((datosAPI) => {
        renderCard(datosAPI);
        addCardForm.close();
      })
      .catch((error) => console.log(error))
      .then(() => aroundUsAPI.loaded());
  },
});
addCardForm.setEventListeners();

addCardOpenButton.addEventListener("click", () => {
  addCardForm.open();
});

/////UTILS
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

const profileFormAvatarValidator = new FormValidator(
  formErrorSettings,
  avatarForm._form,
);
profileFormAvatarValidator.setEventListeners();

const addCardFormValidator = new FormValidator(
  formErrorSettings,
  addCardForm._form,
);
addCardFormValidator.setEventListeners();
