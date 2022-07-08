function randomName(name) {
  const randomNum = require('./randomNum')
  return name + randomNum(9999999, 1)
}
module.exports = randomName
