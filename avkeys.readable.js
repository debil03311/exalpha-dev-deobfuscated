const EndBytes = [0x27, 0x56, 0x1a, 0x48, 0xd, 0x5b, 0x17];

function createKey(username) {
  username = username.toUpperCase();

  if (username.length > 15) {
    console.log('Name too long');
    return '#';
  }

  if (username.match(/[^A-Z0-9_]/)) {
    console.log('Invalid character, use only A to Z uppercase');
    return '#';
  }

  let numberString0 = '';
  let counter = 0;

  for (let i = 0; i < username.length; i++) {
    numberString0 += (70 - (26 - (username.charCodeAt(i) - 'A'.charCodeAt(0)))).toString();
    counter++;
  }

  numberString0 += EndBytes[Math.floor(Math.random() * EndBytes.length)].toString();
  counter++;
  let numberString1 = numberString0;

  while (++counter != 15)
    numberString1 += (10 + Math.floor(Math.random() * 89)).toString();

  let number0 = 0;
  for (let i = 0; i < numberString1.length; i++)
    number0 += numberString1.charCodeAt(i) - '0'.charCodeAt(0);

  let number1 = 0;
  for (let i = 0; i < numberString0.length; i++)
    number1 += numberString0.charCodeAt(i) - '0'.charCodeAt(0);

  number1 %= 100;

  const randomNumber0 = number0 + Math.floor(Math.random() * (999 - number0));
  const randomNumber1 = randomNumber0 - number0;

  let key = '';
  key += ('000' + randomNumber0).slice(-3);
  key = key.split('').reverse().join('');
  key += numberString1;
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
  const username = document.getElementById('name').value;

  if (!username) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * name cannot be empty'
    return;
  }

  const key = createKey(username);

  if (username.startsWith('dev')) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * this username format is reserved for internal use';
    return;
  }

  if (username.length > 15) {
    document.getElementById('key').innerHTML = 'Errors occurred during key generation:<br> * username too long';
    return;
  }

  document.getElementById('key').innerHTML = (key == '#')
    ? 'Errors occurred during key generation:<br> * invalid character in username'
    : `Success! Your key is:<br> ${key}`
}