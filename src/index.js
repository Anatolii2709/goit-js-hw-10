import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '400px',
  position: 'center-center',
  fontSize: '20px',
  borderRadius: '15px',
  timeout: '2000',
  clickToClose: 'true',
});

function populateBreedsSelect() {
  const selectElement = document.querySelector('select.breed-select');
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');

  selectElement.style.display = 'none'; // - select
  loaderElement.style.display = 'block'; // + loader
  errorElement.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      const options = breeds.map(breed => {
        const optionElement = document.createElement('option');
        optionElement.value = breed.id;
        optionElement.textContent = breed.name;
        return optionElement;
      });

      options.forEach(option => {
        selectElement.appendChild(option);
      });

      loaderElement.style.display = 'none'; // - loader
      selectElement.style.display = 'block'; // + select

      new SlimSelect({
        select: '.breed-select',
      });
    })
    .catch(() => {
      Notiflix.Notify.info(
        'Oops! Something went wrong! Try reloading the page!'
      );
      loaderElement.style.display = 'none'; // - loader
    });
}

function displayCatInfo(cat) {
  const catInfoElement = document.querySelector('div.cat-info');
  const loaderElement = document.querySelector('p.loader');

  catInfoElement.innerHTML = ''; // Очищуємо контейнер

  const imageElement = document.createElement('img');
  imageElement.src = cat[0].url;
  imageElement.style.width = '400px';
  catInfoElement.appendChild(imageElement);

  const breedNameElement = document.createElement('p');
  breedNameElement.textContent = `Breed: ${cat[0].breeds[0].name}`;
  catInfoElement.appendChild(breedNameElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${cat[0].breeds[0].description}`;
  catInfoElement.appendChild(descriptionElement);

  const temperamentElement = document.createElement('p');
  temperamentElement.textContent = `Temperament: ${cat[0].breeds[0].temperament}`;
  catInfoElement.appendChild(temperamentElement);

  catInfoElement.style.display = 'block'; // + блок з інформацією про кота
  loaderElement.style.display = 'none'; // - loader
}

function handleSelectChange() {
  const selectElement = document.querySelector('select.breed-select');
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');

  const breedId = selectElement.value;

  loaderElement.style.display = 'block'; // + loader

  fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
    })
    .catch(() => {
      loaderElement.style.display = 'none'; // - loader
      errorElement.style.display = 'block';
    });
}

document.addEventListener('DOMContentLoaded', () => {
  populateBreedsSelect();

  const selectElement = document.querySelector('select.breed-select');
  selectElement.addEventListener('change', handleSelectChange);
});
