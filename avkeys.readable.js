function createKey(name) {
  name = name.toUpperCase();

  if (name.length > 15) {
    console.log('Name too long');
    return '#';
  }

  if (name.match(/[^A-Z0-9_]/)) {
    console.log('Invalid character, use only A to Z uppercase');
    return '#';
  }

  let numberString = '';
  let counter = 0;

  for (let i = 0; i < name.length; i++) {
    numberString += (70 - (26 - (name.charCodeAt(i) - 'A'.charCodeAt(0)))).toString();
    counter++;
  }

  var _numberString = numberString;

  while (++counter != 15) {
    _numberString += (10 + Math.floor(Math.random() * 89)).toString();
  }

  let number0 = 0;
  for (let i = 0; i < _numberString.length; i++)
    number0 += _numberString.charCodeAt(i) - '0'.charCodeAt(0);

  var number1 = 0;
  for (let i = 0; i < numberString.length; i++)
    number1 += numberString.charCodeAt(i) - '0'.charCodeAt(0);

  number1 %= 100;

  const randomNumber0 = number0 + Math.floor(Math.random() * (999 - number0));
  const randomNumber1 = randomNumber0 - number0;

  let key = '';
  key += ('000' + randomNumber0).slice(-3);
  key = key.split('').reverse().join('');
  key += _numberString;
  key += ('000' + randomNumber1).slice(-3);
  key += ('00' + number1).slice(-2);
  key = key.slice(0, 6) + '-' + key.slice(6);
  key = key.slice(0, 15) + '-' + key.slice(15);
  key = key.slice(0, 23) + '-' + key.slice(23);
  key = key.slice(0, 31) + '-' + key.slice(31);
  key = key.slice(0, 36) + '-' + key.slice(36);

  return key;
}

function genKeyAfterTime() {
  document.getElementById('key').innerHTML = 'Please wait...';
  setTimeout(generateKey, 1000);
}

function generateKey() {
  const name = document.getElementById('name').value;

  if (!name) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * name cannot be empty'
    return;
  }

  const key = createKey(name);

  if (name.startsWith('dev')) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * this username format is reserved for internal use';
    return;
  }

  if (name.length > 15) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * username too long';
    return;
  }

  document.getElementById('key').innerHTML = (key == '#')
    ? 'Errors occurred during key generation:<br> * invalid character in username'
    : `Success! Your key is:<br> ${key}`
}