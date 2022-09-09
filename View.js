const { EventEmitter } = require('events');
const readlineSync = require('readline-sync');


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
        this.renderStartPage();
        break;
      case 'questions':
        this.renderQuestionPage();
        break;
    }   
  }

  renderStartPage() {
    // здесь попросим у модели список тем и предоставим пользователю выбор
    let topics = this.#model.getTopic();
    console.clear();
    console.log('Пришло время выбрать тему:');
    console.log();
    topics.forEach((element, i) => {
        console.log(`${i + 1}. ${element}`);
      });
      console.log();
      const topic = readlineSync.question('> ');
      this.emit('topicChosen', topic);
    }


  renderQuestionPage() {
    console.clear();
    let questions = this.#model.getQuestions();
    let count = 0;
    for (let i = 0; i < questions.length; i++) {
      let question = questions[i]
      console.log(Object.keys(question).toString());
      const answer = readlineSync.question('> ');
      if(answer) {
        if (answer.toLowerCase() === Object.values(question).toString().toLowerCase()) {
          count++
          console.clear();
          console.log('Молодец, все верно!');
          console.log();
          continue
        } else {
          console.clear();
          console.log('Неправильный ответ!');
          console.log();
        }
      }
    }
    if (count === 0 || count === 1) console.log(`Твой результат ${count} из 5: в следующий раз попробуй подумать получше, но главное не расстраивайся 😸`);
    if (count === 2 || count === 3) console.log(`Твой результат ${count} из 5: В целом неплохо для начала 👻`);
    if (count === 4 || count === 5) console.log(`Твой результат ${count} из 5: Мегамозг🤖`);
  }

}

module.exports = View;
