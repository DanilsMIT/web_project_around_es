import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Sprint 11
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupwithImage.js";
import PopupDelete from "./PopupDelete.js";

//Sprint 12 API
import {
  loaded,
  userAPIGET,
  userAPIPATCH,
  userAPIPATCHAvatar,
  cardsAPIGET,
  cardsAPIPOST,
  cardsAPIToggleLike,
  cardsAPIDelete,
} from "./API.js";

import {
  editarAvatarFormularioPopup,
  editarPerfilFormularioPopup,
  verImagenPopUp,
  eliminarCartaPopup,
  agregarCartaPopup,
} from "./constPopUps.js";

/////Section Profile
/*Profile*/
let usuario;
userAPIGET()
  .then((datosAPI) => {
    usuario = new UserInfo({
      profileName: datosAPI.name,
      profileAbout: datosAPI.about,
      profileAvatar: datosAPI.avatar,
    });
    usuario.setUser();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    loaded();
  });

/*Formulario cambiar foto de perfil*/
const editprofileAvatar = document.querySelector("#editprofileAvatar");

const avatarForm = new PopupWithForm({
  PopupSelector: editarAvatarFormularioPopup,
  handleFormSubmit: (inputs) => {
    userAPIPATCHAvatar(inputs);
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
    userAPIPATCH(inputs);
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
    (esteElemento) => {
      PopupDeleteCard.open(() => {
        cardsAPIDelete(esteElemento._iD);
        esteElemento.removeButtonFunction();
        PopupDeleteCard.close();
      });
    },
    (id, isLiked) => {
      cardsAPIToggleLike(id, isLiked);
    },
  );
  const cardElement = card.generateCard(data);
  SectionCards.addItem(cardElement);
}

/*List Cards*/
let SectionCards;
cardsAPIGET().then((datosAPI) => {
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
});

/*Formulario añadir Card*/
const addCardOpenButton = document.querySelector(".profile__add-button");
const addCardForm = new PopupWithForm({
  PopupSelector: agregarCartaPopup,
  handleFormSubmit: (inputs) => {
    cardsAPIPOST(inputs)
      .then((datosAPI) => {
        renderCard(datosAPI);
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
