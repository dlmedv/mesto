export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items; //массив данных
        this._container =
            document.querySelector(containerSelector); // куда добавляем 
        this._renderer = renderer; //функиця отрисовки и создания
    }

    renderItems() {
        this._renderedItems.forEach((item) => {
            this._renderer(item)
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}