const { EventEmitter } = require('events');
fs = require('fs').promises
class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

  getPage() {
    return this.#page;
  }
  // Функция вывода списка тем:
  async function getTopic() {
    let countTopic = await fs.readdir('./topics')
    countTopic = countTopic.map((el) => el.slice(0, -19))
    console.log(countTopic);
    return countTopic;
  }
  chooseTopic(topic) {
    // тема выбрана, сделай необходимые изменения в модели (в т.ч. измени this.page)
    // ...
    // и теперь пора уведомить View об этих изменениях
    this.emit('update');
  }
}

module.exports = Model;
