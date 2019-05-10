function arrayLast (array) {
  return array[array.length - 1]
}

function choice (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function random (length = 32) {
  if (typeof length != 'number') {
    console.log("Length isn't number")
  }
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
  let result = ''
  for (var i = 0; i < length; i++) {
    result += choice(chars)
  }
  return result
}

module.exports = {
  arrayLast,
  choice,
  random
}
