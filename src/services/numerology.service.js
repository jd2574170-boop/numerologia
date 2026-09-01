const letterValues = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

const reduceNumber = (num, allowMaster = true) => {
  while (num > 9) {
    if (allowMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
};

const calculateLifePath = (birthDate) => {
  const dateObj = new Date(birthDate);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();

  const dayReduced = reduceNumber(day);
  const monthReduced = reduceNumber(month);
  const yearReduced = reduceNumber(year);

  return reduceNumber(dayReduced + monthReduced + yearReduced);
};

const cleanText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
};

const calculateExpression = (fullName) => {
  const letters = cleanText(fullName).split('');
  const sum = letters.reduce((acc, char) => acc + (letterValues[char] || 0), 0);
  return reduceNumber(sum);
};

const calculateSoul = (fullName) => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const letters = cleanText(fullName).split('');
  const vowelSum = letters.reduce((acc, char) => {
    if (vowels.includes(char)) {
      return acc + (letterValues[char] || 0);
    }
    return acc;
  }, 0);
  return reduceNumber(vowelSum);
};

module.exports = {
  calculateLifePath,
  calculateExpression,
  calculateSoul,
  reduceNumber
};