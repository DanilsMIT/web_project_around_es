function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeKey);
}
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeKey);
}

function closeKey(event) {
  if (event.key === "Escape") {
    let popup = document.querySelector(".popup_is-opened");
    if (popup) {
      closeModal(popup);
    }
  }
}

export { openModal, closeModal };
