import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async getRestaurantList() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurants(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async searchRestaurants(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async addReview(reviewData) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    };

    const response = await fetch(API_ENDPOINT.ADD_REVIEW, options);
    return response.json();
  }

  static getRestaurantImageUrl(size, pictureId) {
    switch (size) {
      case 'small':
        return API_ENDPOINT.RESTAURANT_IMAGE_SMALL(pictureId);
      case 'medium':
        return API_ENDPOINT.RESTAURANT_IMAGE_MEDIUM(pictureId);
      case 'large':
        return API_ENDPOINT.RESTAURANT_IMAGE_LARGE(pictureId);
      default:
        return '';
    }
  }
}

export default RestaurantSource;
