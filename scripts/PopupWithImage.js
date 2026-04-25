import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(PopupSelector) {
    super(PopupSelector);
  }
  open(data) {
    const popUpImage = this._PopupSelector.querySelector(".popup__image");
    const popUpCaption = this._PopupSelector.querySelector(".popup__caption");

    popUpImage.src = data.link;
    popUpImage.alt = data.name;
    popUpCaption.textContent = data.name;
    super.open();
  }
}
