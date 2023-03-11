export default class Section {
    constructor({renderer}, containerSelector) {
        this._container =
            document.querySelector(containerSelector); // куда добавляем 
        this._renderer = renderer; //функиця отрисовки и создания
    }

    renderItems(items) {
        items.reverse().forEach((item) => {
            this._renderer(item);
        });
        
    }

    addItem(element) {
        this._container.prepend(element);
    }
}
