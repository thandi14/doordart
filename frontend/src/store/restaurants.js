import { csrfFetch } from "./csrf";

const GET_RESTAURANTS = "restaurant/getRestaurants";
const GET_RESTAURANT = "restaurant/getRestaurant";
const GET_REVIEW = "restaurant/getReview";
const UPDATE_REVIEW = "restaurant/updateReview";
const DELETE_REVIEW = "restaurant/deleteReview";


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


const getReview = (review) => {
  return {
    type: GET_REVIEW,
    review,
  };
};

const updateReview = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    id,
  };
};

export const thunkGetUserRestaurants = () => async (dispatch) => {
    const response = await csrfFetch("/api/restaurants");
    const data = await response.json();
    dispatch(getRestaurants(data));
    return response;
};

export const thunkGetRestaurants = (data) => async (dispatch) => {
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

export const thunkGetRestaurant = (id, data) => async (dispatch) => {
  console.log(data)
  const response = await csrfFetch(`/api/restaurants/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getRestaurant(data1));
  return response;
};

export const thunkCreateReview = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/restaurants/${id}/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(getReview(data1));
  return response;
};

export const thunkUpdateReview = (id, data) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const data1 = await response.json();
  dispatch(updateReview(data1));
  return response;
};


export const thunkDeleteReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const data = await response.json();
  dispatch(deleteReview(id));
  return response;
};

let initialState = {
   restaurants: {},
   restaurant: {},
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
    case GET_REVIEW:
      newState = { ...state };
      const review = action.review;
      newState.restaurant.Reviews?.push(review);
      return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      const update = action.review;
      newState.restaurant.Reviews.forEach((r) => {
        if (r.id == update.id) {
          r = update
        }
      });
      return newState;
    case DELETE_REVIEW:
      newState = { ...state };
      const reviewId = action.id;
      newState.restaurant.Reviews.filter((r) => r.id != reviewId);
      return newState;
    default:
      return state;
  }
};

export default restaurantReducer;
