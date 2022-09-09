const { EventEmitter } = require('events');
const { readdirSync, readlinkSync } = require('fs');
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

  
  render() {
    // отображаем ту страницу, на которой мы сейчас находимся
    switch (this.#model.getPage()) {
      case 'start':
        this.renderStartPage();
        break;
    }
    {
       case 'questions':
       this.renderQuestionPage();
      }   
  }

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
    // const topic = readlineSync.question('> ');
    this.emit('topicChosen', topic);
  }

  renderQuestionPage() {
    console.clear() 
    let questions = this.#model.getQuestions;
    for (let i = 0; i < questions.length; i++) {
      console.log(questions[i]);
      // const question = readlineSync.question('> ')
      if(question) {
        console.log('Неправильный ответ!')
      } else {
        console.log('Ты ответил правильно!')
      }
    }
  }
}

module.exports = View;

let model = new Model()
model.questions = [
  { 'Что является основным источником пищи выдры?': 'рыба' },
  {
    'Верно или нет? Выдры большую часть времени проводят на суше.': 'верно'
  },
  { 'Сколько существует видов выдр?': '13' },
  { 'Верно или нет? Выдры родом из Австралии.': 'нет' },
  {
    'Верно или нет? Выдры изготавливают и используют инструменты.': 'верно'
  },
  {
    'Какова средняя продолжительность жизни выдры в дикой природе?': '10'
  }
]

let view = new View(model)

view.renderQuestionPage()
