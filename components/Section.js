//export to index.js

/*
The Section class isn’t represented in the webpage’s markup. 
Instead, it’s a utility class that serves a specific purpose: 
to add elements to the DOM. 
Create it according to the following requirements.

1. The first parameter of its constructor should be an object with two properties 
(items and renderer).
  a. the items property should be an array of data, 
  which you must add to the page when it loads.
  b. the renderer property should be a function that 
  creates and adds a single item to the page.

2. Its second constructor parameter should be a 
CSS class selector where you'll add the card elements.

3.It has a public method named renderItems() that renders all elements on the page. 
  a. it should iterate through the items array and call the renderer() 
  function on each item. 
  b. this method should be called once on page load.

4. It has a public method named addItem() that takes a 
DOM element and adds it to the container.
 a. this method should be called when adding an individual card to the DOM. 
 */

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Public method renderItems()
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  //Public method addItem()
  addItem(element) {
    this._container.prepend(element);
  }
}
