import _ from 'lodash';
import printMe from './print.js';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  var btn = document.createElement('button');
  btn.innerText = 'Touch me , please !'
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());