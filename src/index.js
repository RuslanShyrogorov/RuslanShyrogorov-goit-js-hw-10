import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');

function handlerInput(e) {
  const searchText = e.target.value.trim()
  if (searchText === '') {
    Notify.failure('Please, enter country name!');
    return
  }
  console.log('searchText: ', searchText);
}

inputEl.addEventListener('input', debounce(handlerInput, DEBOUNCE_DELAY))

