import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="content">
        <h2 class="content__heading">Restaurant List</h2>
        <div id="restaurants" class="restaurants">
        </div>
    </div>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.getRestaurantList();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
