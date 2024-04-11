import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as restaurantActions from "../../store/restaurants";
import { useFilters } from "../../context/Filters";


function RestaurantPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const dispatch = useDispatch()
  const { location } = useFilters()
  const targetRef = useRef()

 useEffect(() => {
     async function fetchData() {
         if ( !location && user?.id ) await dispatch(restaurantActions.thunkGetUserResturants())
        }
     fetchData()

  }, [dispatch])


  const goToNext = (e) => {
      e.stopPropagation()
      setLength(length + 1)

    };

    const goToPrev = (e) => {
        e.stopPropagation();
        setLength(length - 1)
    };

  const sliderStyle = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${length * 50}%)`,
  };

  const franchises = Object.values(restaurants).sort((a, b) => a.miles - b.miles)

  const reviews = (reviews) => {

    if (!reviews.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };


  return (
    <div style={{ position: "relative"}}>
    {/* <HomeNav /> */}
        <div>

        </div>
    {/* <HomeFoot /> */}
    </div>
  );
}

export default RestaurantPage;
