import { spyOn } from 'jest-mock';
import {
  it, describe, expect, beforeEach, jest
} from '@jest/globals';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    document.body.innerHTML = `
      <div id="restaurant-search-container">
        <input id="query" type="text">
        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
        </div>
      </div>
    `;
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurant: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(1);

      presenter._showFoundRestaurants([
        { id: 1, name: 'Satu' },
        { id: 2, name: 'Dua' },
      ]);
      expect(document.querySelectorAll('.restaurant').length).toEqual(2);
    });

    it('should show the name of the found restaurants', () => {
      presenter._showFoundRestaurants([
        { id: 1, name: 'Satu' },
      ]);

      expect(document.querySelectorAll('.restaurant__name')
        .item(0).textContent)
        .toEqual('Satu');

      presenter._showFoundRestaurants([
        { id: 1, name: 'Satu' },
        { id: 2, name: 'Dua' },
      ]);

      const restaurantTitles = document.querySelectorAll('.restaurant__name');

      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without name', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);

      expect(document.querySelectorAll('.restaurant__name')
        .item(0).textContent)
        .toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantTitles = document.querySelectorAll('.restaurant__name');

          expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurant.mockImplementation(() => []);
      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found')
});
