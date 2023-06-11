import { fetchBreeds, fetchCatByBreed } from './cat-api';

function populateBreedsSelect() {
  const selectElement = document.querySelector('select.breed-select');
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');

  selectElement.style.display = 'none'; // Приховуємо select
  loaderElement.style.display = 'block'; // Показуємо loader
  errorElement.style.display = 'none';

  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const optionElement = document.createElement('option');
        optionElement.value = breed.id;
        optionElement.textContent = breed.name;
        selectElement.appendChild(optionElement);
      });

      selectElement.style.display = 'block'; // Показуємо select
      loaderElement.style.display = 'none'; // Приховуємо loader
    })
    .catch(error => {
      console.error(error);
      loaderElement.style.display = 'none'; // Приховуємо loader
      errorElement.style.display = 'block';
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

  catInfoElement.style.display = 'block'; // Показуємо блок з інформацією про кота
  loaderElement.style.display = 'none'; // Приховуємо loader
}

function handleSelectChange() {
  const selectElement = document.querySelector('select.breed-select');
  const loaderElement = document.querySelector('p.loader');
  const errorElement = document.querySelector('p.error');

  const breedId = selectElement.value;

  //   selectElement.style.display = 'none'; // Приховуємо select
  loaderElement.style.display = 'block'; // Показуємо loader

  fetchCatByBreed(breedId)
    .then(cat => {
      displayCatInfo(cat);
    })
    .catch(error => {
      console.error(error);
      loaderElement.style.display = 'none'; // Приховуємо loader
      errorElement.style.display = 'block';
    });
}

// Виклик функції після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  populateBreedsSelect();

  const selectElement = document.querySelector('select.breed-select');
  selectElement.addEventListener('change', handleSelectChange);
});
