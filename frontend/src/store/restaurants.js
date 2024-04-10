import { csrfFetch } from "./csrf";

const GET_RESTAURANT = "restaurant/getRestaurant";

const getRestaurant = (restaurants) => {
  return {
    type: GET_RESTAURANT,
    restaurants,
  };
};

export const thunkGetResturants = () => async (dispatch) => {
    const response = await csrfFetch("/api/restaurants");
    const data = await response.json();
    dispatch(getRestaurant(data));
    return response;
};

let initialState = {
   restaurants: {}
}


const restaurantReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_RESTAURANT:
      newState = { ...state };
      if (action.restaurants.length) action.restaurants.forEach(
        (restaurant) => (newState.restaurants[restaurant.id] = { ...restaurant})
      );
      return newState;
    default:
      return state;
  }
};

export default restaurantReducer;
