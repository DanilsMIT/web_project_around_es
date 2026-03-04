initialCards = [
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

/*Etapa 2*/
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");

const editProfileForm = document.querySelector("#edit-popup");
const profileForm = editProfileForm.querySelector("#edit-profile-form");
const inputProfileName = editProfileForm.querySelector(
  ".popup__input_type_name",
);
const inputProfileDescription = editProfileForm.querySelector(
  ".popup__input_type_description",
);
const buttonCloseEditProfile = editProfileForm.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputProfileName.value;
  profileDescription.textContent = inputProfileDescription.value;
  closeModal(editProfileForm);
}

buttonOpenEditProfile.addEventListener("click", () => {
  handleOpenEditModal(editProfileForm);
});
buttonCloseEditProfile.addEventListener("click", () => {
  closeModal(editProfileForm);
});
profileForm.addEventListener("submit", handleProfileFormSubmit);
