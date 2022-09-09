const { EventEmitter } = require('events');

class View extends EventEmitter {
  #model;

  constructor(model) {
    super();
    this.#model = model;

    // каждый раз когда модель изменяется обновляем отображение
    this.#model.on('update', () => this.render());
  }

  render() {
    // отображаем ту страницу, на которой мы сейчас находимся
    switch (this.#model.getPage()) {
      case 'start':
        return this.renderStartPage();
      // ...
    }
  }

  renderStartPage() {
    // здесь попросим у модели список тем и предоставим пользователю выбор
    // ...
    // теперь уведомим контроллер о том что пользователь выбрал тему
    this.emit('topicChosen', topic);
  }
}

module.exports = View;
