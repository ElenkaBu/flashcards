const { EventEmitter } = require('events');
const fs = require('fs');

class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

  #questions = [];

  #stat = 0;

  getPage() {
    return this.#page;
  }

  getStat() {
    return this.#stat;
  }

  setStatUp() {
    this.#stat += 1;
  }

  getQuestions() {
    return this.#questions;
  }

  // Функция вывода списка тем:
  getTopic() {
    let countTopic = fs.readdirSync('./topics')
    countTopic = countTopic.map((el) => el.slice(0, -4));
    return countTopic;
  }

  chooseTopic(topic) {
    this.#page = 'questions';
    const data = fs.readFileSync(`${__dirname}/topics/${topic}.txt`, 'utf-8');
    const arrOfQuestions = data.split('\n');
    for (let i = 0; i < arrOfQuestions.length; i += 3) {
      const step = {};
      step[arrOfQuestions[i]] = arrOfQuestions[i + 1];
      this.#questions.push(step);
    }
    this.emit('update');
  }


  defineRank() {
    const count = this.getStat();
    if (count === 0 || count === 1) return `Твой результат ${count} из 5: в следующий раз попробуй подумать получше, но главное не расстраивайся 😸`;
    if (count === 2 || count === 3) return `Твой результат ${count} из 5: В целом неплохо для начала 👻`;
    if (count === 4 || count === 5) return `Твой результат ${count} из 5: Мегамозг🤖`;
  }
  // getQues(index) {
  //   const questions = this.getQuestions;
  //   const que = questions(index);
  //   return Object.keys(que).toString();
  // }
}

module.exports = Model