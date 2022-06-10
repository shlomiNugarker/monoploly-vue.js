export const utilService = {
  makeId,
  debounce,
  getRandomInt,
  getRandomColor,
  getLoremIpsum,
  loadFromStorage,
  saveToStorage,
  loadFromSessionStorage,
  saveToSessionStorage,
  delay,
}
function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function debounce(func, wait) {
  let timeout

  return function executedFunction(...args) {
    //rest-makes the args to an array
    const later = () => {
      clearTimeout(timeout)
      func(...args) //spread-from array to vars
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function getRandomColor() {
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10)
  }
  return color
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function getLoremIpsum(length = 5) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  let sentence = ''
  while (length > 0) {
    sentence += words[getRandomInt(0, words.length - 1)] + ' '
    length--
  }
  return sentence.trim()
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

function saveToStorage(key, val) {
  localStorage[key] = JSON.stringify(val)
}

function loadFromSessionStorage(key) {
  var val = sessionStorage.getItem(key)
  return val ? JSON.parse(val) : null
}

function saveToSessionStorage(key, val) {
  sessionStorage[key] = JSON.stringify(val)
}
