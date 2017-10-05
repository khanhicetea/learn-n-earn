import _ from 'lodash';
import './style.css';
import DogImage from './dog.jpg';
import Data from './data.xml';

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.innerHTML += _.join([', from', Data.note.from], ' ');
  element.classList.add('hello');

  var cuteDog = new Image();
  cuteDog.src = DogImage;

  element.appendChild(cuteDog);

  return element;
}

document.body.appendChild(component());