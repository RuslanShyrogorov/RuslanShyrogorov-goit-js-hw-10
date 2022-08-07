import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetch-countries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryOneInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');


function showError(error) {
  console.log(error);
  Notify.failure('Oops, there is no country with that name');
  countryOneInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function createMarkupList(country) {
  const markup = country
    .map(({ name, flags }) => {
      return `
      <li>
        <img  src="${flags.svg}" width="30" alt="flag of ${name.common}"/><span >${name.official}</span>
      </li>`;
    }).join('');
  countryList.innerHTML = markup;
}

function createMarkupItem([{ name, capital, population, flags, languages }]) {
  const markupItem = `
  <div>
      <img src="${flags.svg}" width="30" alt='${name.common}'>
      <h1>${name.official}</h1>
      <p>'Capital: ${capital}'</p>
      <p>'Population: ${population}'</p>
      <p>'Languages: ${Object.values(languages).join(', ')}'</p>
  </div>`;
  countryOneInfo.innerHTML = markupItem;
}

function handlerInput() {
  let userInfo = inputEl.value.trim();
  if (userInfo === '') {
  } else {
    fetchCountries(userInfo)
      .then(country => {
        countryOneInfo.innerHTML = '';
        countryList.innerHTML = '';
        if (country.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (country.length >= 2 && country.length <= 10) {
          createMarkupList(country);
        } else if (country.length === 1) {
          Notify.success(
            'You have been looking for this country for all your life'
          );
          createMarkupItem(country);
          console.log(country, 'length = 1');
        }
      })
      .catch(showError);
  }
}

inputEl.addEventListener('input', debounce(handlerInput, DEBOUNCE_DELAY));