const { EventEmitter } = require('events');
const { fstat, readFile } = require('fs');
const fs = require('fs').promises

class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

// ????
  questions = []

  getPage() {
    return this.#page;
  }

  async chooseTopic(topic) {
    this.#page = 'questions'
    const data = await fs.readFile(`${__dirname}/topics/${topic}_flashcard_data.txt`, 'utf-8')
    console.log(data)
    let arrOfQuestions = data.split('\n')
    for (let i = 0; i < arrOfQuestions.length; i+=3) {
      let step = {}
      step[arrOfQuestions[i]] = arrOfQuestions[i + 1]
      questions.push(step)
    }
    this.emit('update');
  }
}


