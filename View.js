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
    // eslint-disable-next-line default-case
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
    const topics = this.#model.getTopic();

    console.clear();
    console.log('Пришло время выбрать тему:');
    console.log();
    topics.forEach((element, i) => {
      console.log(`${i + 1}. ${element}`);
    });
    console.log();
    const index = readlineSync.question('> ');
    const topic = topics[index - 1];
    this.emit('topicChosen', topic);
  }

  renderQuestionPage() {
    console.clear();
    const questions = this.#model.getQuestions();
    for (let i = 0; i < questions.length; i += 1) {
      const question = questions[i];
      console.log(Object.keys(question).toString());

      const answer = readlineSync.question('> ');
      if (answer) {
        if (answer.toLowerCase() === Object.values(question).toString()) {
          this.#model.setStatUp();
          console.clear();
          console.log('Молодец, все верно!');
          console.log();
          continue;
        } else {
          console.clear();
          console.log('Неправильно!');
          console.log();
          console.log(`Правильный ответ: ${Object.values(question).toString()}`)
          console.log();
        }
      }
    }
    const rank = this.#model.defineRank();
    console.log(rank);
  }
}

module.exports = View;
