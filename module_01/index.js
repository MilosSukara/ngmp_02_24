const MIN = 1;
const MAX = 1000;


function randomIntegerMinMax(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max + 1); // Making the max value inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function getRandomNumber() {
  return randomIntegerMinMax(MIN, MAX);
}

console.log(getRandomNumber());