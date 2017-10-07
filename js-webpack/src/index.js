import _ from 'lodash';
import printMe from './print.js';
import { square } from './math.js';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join([
    'Hello webpack !',
    '5 squared is equal to ' + square(5)
  ], '\n\n');

  var btn = document.createElement('button');
  btn.innerText = 'Touch me , please !'
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());