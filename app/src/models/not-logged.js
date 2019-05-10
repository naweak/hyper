const ErrorResponse = require('@naweak/n/lib/error')

class NotLogged extends ErrorResponse {
  constructor () {
    super('Не залогинен', 12)
  }
}

module.exports = NotLogged
