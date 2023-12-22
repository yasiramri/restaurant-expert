const { async } = require('regenerator-runtime');
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const favoritesRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, favoritesRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.waitForElement('.restaurant__name a');

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name a').at(i));

    I.waitForElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant__name'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleFavoritesRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(names.length, visibleFavoritesRestaurants);

  const searchQuery = names[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedFavoritesRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');

  assert.strictEqual(matchingRestaurants.length, visibleSearchedFavoritesRestaurants);

  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleName = await I.grabTextFrom(locate('.restaurant__name').at(i +1));

    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
