export default class Section {
  constructor({ items, render }, container) {
    this._items = items;
    this._render = render;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._render(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
