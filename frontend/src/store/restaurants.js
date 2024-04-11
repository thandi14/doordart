import { csrfFetch } from "./csrf";

const GET_RESTAURANTS = "restaurant/getRestaurants";
const GET_RESTAURANT = "restaurant/getRestaurant";


const getRestaurants = (restaurants) => {
  return {
    type: GET_RESTAURANTS,
    restaurants,
  };
};

const getRestaurant = (restaurant) => {
  return {
    type: GET_RESTAURANT,
    restaurant,
  };
};

export const thunkGetUserResturants = () => async (dispatch) => {
    const response = await csrfFetch("/api/restaurants");
    const data = await response.json();
    dispatch(getRestaurants(data));
    return response;
};

export const thunkGetResturants = (data) => async (dispatch) => {
  const response = await csrfFetch("/api/restaurants", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getRestaurants(data1));
  return response;
};

export const thunkGetResturant = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${id}`);
  const data = await response.json();
  dispatch(getRestaurant(data));
  return response;
};

let initialState = {
   restaurants: {},
   restaurant: {}
}


const restaurantReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_RESTAURANTS:
      newState = { ...state };
      if (action.restaurants.length) action.restaurants.forEach(
        (restaurant) => (newState.restaurants[restaurant.id] = { ...restaurant})
      );
      return newState;
    case GET_RESTAURANT:
      newState = { ...state };
      const restaurant = action.restaurant;
      newState.restaurant = { ...restaurant };
      return newState;
    default:
      return state;
  }
};

export default restaurantReducer;
