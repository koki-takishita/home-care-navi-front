function randomNum(max, min) {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}
module.exports = randomNum
