export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Public method renderItems()
  renderItems(items) {
    if (Array.isArray(items)) {
      this._items = items;
      this._items.forEach((item) => {
        this._renderer(item);
      });
    } else {
      console.error("Items is not an array:", items);
    }
  }
  /* 
  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
*/
  //Public method addItem()
  addItem(element) {
    this._container.prepend(element);
  }
}
