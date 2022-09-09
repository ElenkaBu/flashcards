const readline = require('readline')
const { question } = require('readline-sync')

const rl = readline.createInterface (
  {
    input:process.stdin,
    output:process.stdout
  }
)
class View {
  constructor() {
    getTopic (topicName) {
      return new Promise((resolve, reject) => {
      rl,question(`Привет, настало время выбрать тему: ${question}`, (answer, err) => {
        if (err) reject(err);
        resolve(answer);
      })
      })
    }
  }
}