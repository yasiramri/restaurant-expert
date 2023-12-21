class FavoriteRestaurantSearchView {
    getTemplate() {
    return `
      <div id="restaurant-search-container">
        <input id="query" type="text">

        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
      </div>
  `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(`
          <li class="restaurant">
            <span class="restaurant__name">${restaurant.name || '-'}</span>
          </li>
        `),
        '',
      );
    } else {
      html = '<div class="restaurants__not__found">Restaurant tidak ditemukan</div>';
    }
    document.querySelector('.restaurants').innerHTML = html;

    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurants:searched:updated'));
  }
}