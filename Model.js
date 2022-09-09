const { EventEmitter } = require('events');

class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

  getPage() {
    return this.#page;
  }

  chooseTopic(topic) {
    // тема выбрана, сделай необходимые изменения в модели (в т.ч. измени this.page)
    // ...
    // и теперь пора уведомить View об этих изменениях
    this.emit('update');
  }
}

module.exports = Model;
