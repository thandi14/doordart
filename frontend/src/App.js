import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as cartActions from "./store/shoppingcart";

import SplashPage from "./components/SplashPage";
import HomePage from "./components/HomePage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import RestaurantPage from "./components/RestaurantPage";
import ReviewPage from "./components/ReviewPage";
import { useFilters } from "./context/Filters";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(cartActions.thunkGetCarts())
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
  <Switch>
    <Route exact path="/">
      <SplashPage />
    </Route>
    <Route exact path="/home">
      <HomePage />
    </Route>
    <Route exact path="/restaurant/:id">
      <RestaurantPage />
    </Route>
    <Route exact path="/restaurant/:id/reviews">
      <ReviewPage />
    </Route>
  </Switch>
</>
  );
}

export default App;
