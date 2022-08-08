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
      <li class = "country-list-item">
        <img class="imges" src="${flags.svg}" width="30" alt="flag of ${name.common}"/><span class="country-list__span">${name.official}</span>
      </li>`;
    }).join('');
  countryList.innerHTML = markup;
}

// function createMarkupItem([{ name, capital, population, flags, languages }]) {
//   const markupItem = `
//   <div>
//       <img src="${flags.svg}" width="30" alt='${name.common}'>
//       <h1 class="title>${name.official}</h1>
//       <p class="text">'Capital: ${capital}'</p>
//       <p class="text">'Population: ${population}'</p>
//       <p class="text">'Languages: ${Object.values(languages).join(', ')}'</p>
//   </div>`;
//   countryOneInfo.innerHTML = markupItem;
// }
function createMarkupItem([{ name, capital, population, flags, languages }]) {
  const markupItem = `
    <img class="imges" src="${flags.svg}" width="40" alt="flag of ${name.common}"/><span class="imges-span">${name.official}</span>
    <p class="text">Capital: <span class = "text-span">${capital}</span></p>
    <p class="text">Population: <span class = "text-span">${population}</span></p>
    <p class="text">Languages: <span class = "text-span">${Object.values(languages).join(', ')}</span></p>`;
  countryOneInfo.innerHTML = markupItem;
}

function handlerInput() {
  let userInfo = inputEl.value.trim();
  if (userInfo === '') {
    // Notify.failure('Enter a search value');
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