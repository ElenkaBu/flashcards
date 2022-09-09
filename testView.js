const { EventEmitter } = require('events');
const readline = require('readline');
const Model = require('./Model');


const rl = readline.createInterface (
  {
    input:process.stdin,
    output:process.stdout
  }
)
// class View {
//   constructor() {
//     getTopic (topicName) {
//       return new Promise((resolve, reject) => {
//       rl,question(`Привет, настало время выбрать тему: ${question}`, (answer, err) => {
//         if (err) reject(err);
//         resolve(answer);
//       })
//       })
//     }
//   }
// }

class View extends EventEmitter {
  #model;

  constructor(model) {
    super();
    this.#model = model;

    // каждый раз когда модель изменяется обновляем отображение
    this.#model.on('update', () => this.render());
  }

  
  // render() {
  //   // отображаем ту страницу, на которой мы сейчас находимся
  //   switch (this.#model.getPage()) {
  //     case 'start':
  //       return this.renderStartPage();
  //   }
  // }

  renderStartPage() {
    // здесь попросим у модели список тем и предоставим пользователю выбор
    let topics = this.#model.getTopic()
    console.clear()
    console.log('Пришло время выбрать тему:')
    console.log()
    topics.
    then ((el) => {
      el.forEach((element, i) => {
        console.log(`${i + 1}. ${element}`)
      });
      console.log()
    })
    // теперь уведомим контроллер о том что пользователь выбрал тему
    const topic = readlineSync.question('> ');
    this.emit('topicChosen', topic);
  }
}

module.exports = View;

let model = new Model()

let view = new View(model)

view.renderStartPage()
