const { EventEmitter } = require('events');
const { fstat, readFile } = require('fs');
const fs = require('fs')

class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';
  questions = [];

  getPage() {
    return this.#page;
  }

  getQuestions() {
    return this.questions;
  }

  // Функция вывода списка тем:
  getTopic() {
    let countTopic = fs.readdirSync('./topics')
    countTopic = countTopic.map((el) => el.slice(0, -19))
    return countTopic;
  }

  chooseTopic(topic) {
    this.#page = 'questions'
    const data = fs.readFileSync(`${__dirname}/topics/${topic}_flashcard_data.txt`, 'utf-8')
    let arrOfQuestions = data.split('\n');
    for (let i = 0; i < arrOfQuestions.length; i += 3) {
      let step = {}
      step[arrOfQuestions[i]] = arrOfQuestions[i + 1];
      this.questions.push(step);
    }
    this.emit('update');
  }
}


module.exports = Model