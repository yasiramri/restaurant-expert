const restaurantList = document.getElementById('restaurant-list');

fetch('/data/DATA.json')
  .then((response) => response.json())
  .then((data) => {
    const { restaurants } = data;
    restaurants.forEach((restaurant, index) => {
      const restaurantDiv = document.createElement('div');
      restaurantDiv.classList.add('restaurant');

      const nameElement = document.createElement('h2');
      nameElement.textContent = restaurant.name;
      nameElement.tabIndex = index + 9;

      const cityElement = document.createElement('p');
      cityElement.textContent = `Kota: ${restaurant.city}`;
      cityElement.tabIndex = index + 9;

      const imageElement = document.createElement('img');
      imageElement.src = restaurant.pictureId;
      imageElement.alt = `Gambar restoran ${restaurant.name}`;
      imageElement.tabIndex = index + 9;

      const ratingElement = document.createElement('p');
      ratingElement.textContent = `Rating: ${restaurant.rating}`;
      ratingElement.tabIndex = index + 9;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = restaurant.description;
      descriptionElement.tabIndex = index + 9;

      restaurantDiv.appendChild(nameElement);
      restaurantDiv.appendChild(cityElement);
      restaurantDiv.appendChild(imageElement);
      restaurantDiv.appendChild(ratingElement);
      restaurantDiv.appendChild(descriptionElement);

      restaurantList.appendChild(restaurantDiv);
    });
  });
