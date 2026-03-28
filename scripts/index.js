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

/*Proyecto 9 - error mensajes*/

function showInputError(inputElement, errorMessage) {
  const errorElement = inputElement
    .closest("form")
    .querySelector(`.${inputElement.id}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(inputElement) {
  const errorElement = inputElement
    .closest("form")
    .querySelector(`.${inputElement.id}-input-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("form__input-error_active");
}

function checkInputValidity(input) {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
}

function inputSubmit(event, inputs) {
  let formValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
      formValid = false;
    }
  });

  if (!formValid) {
    event.preventDefault();
  }
}

function hasInvalidInput(inputs) {
  return Array.from(inputs).some((input) => !input.validity.valid);
}

function toggleButtonState(inputs, button) {
  if (hasInvalidInput(inputs)) {
    button.classList.add("button__disabled");
    button.disabled = true;
  } else {
    button.classList.remove("button__disabled");
    button.disabled = false;
  }
}

/*Formulario Editar perfil*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");

const editProfileFormPopUp = document.querySelector("#edit-popup");
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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

buttonOpenEditProfile.addEventListener("click", () => {
  openModal(editProfileFormPopUp);
  profileForm.reset();
  profileInputs.forEach((input) => {
    checkInputValidity(input);
    toggleButtonState(profileInputs, profileFormButton);
  });
});

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
const cardPicturePopUp = document.querySelector("#image-popup");
const cardPictureButtonClose = cardPicturePopUp.querySelector(".popup__close");
const cardPicture = cardPicturePopUp.querySelector(".popup__image");
const cardPictureCaption = cardPicturePopUp.querySelector(".popup__caption");

cardPictureButtonClose.addEventListener("click", () => {
  closeModal(cardPicturePopUp);
});

/*lista de elementos*/
const cardsTemplate = document
  .querySelector("#cards__list-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(object) {
  const cardElement = cardsTemplate.cloneNode(true);

  const name = object.name ?? "Sín tíulo";
  const link = object.link ?? "/images/placeholder.jpg";

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const removeButton = cardElement.querySelector(".card__delete-button");
  removeButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const cardPic = cardElement.querySelector(".card__image");
  cardPic.addEventListener("click", () => {
    openModal(cardPicturePopUp);
    cardPicture.alt = name;
    cardPicture.src = link;
    cardPictureCaption.textContent = name;
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const object = { name, link };
  const card = getCardElement(object);
  container.prepend(card);
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsList);
});

/*formulario nueva carta*/
const addCardPopUp = document.querySelector("#new-card-popup");
const addCardForm = addCardPopUp.querySelector("#new-card-form");
const inputCardName = addCardForm.querySelector(".popup__input_type_card-name");
const inputCardLink = addCardForm.querySelector(".popup__input_type_url");

const buttonOpenAddCard = document.querySelector(".profile__add-button");
const buttonCloseAddCard = addCardPopUp.querySelector(".popup__close");

function handleOpenAddCardForm() {
  openModal(addCardPopUp);
}

buttonOpenAddCard.addEventListener("click", handleOpenAddCardForm);
buttonCloseAddCard.addEventListener("click", () => {
  closeModal(addCardPopUp);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(inputCardName.value, inputCardLink.value, cardsList);
  addCardForm.reset();
  closeModal(addCardPopUp);
}

addCardForm.addEventListener("submit", handleCardFormSubmit);
