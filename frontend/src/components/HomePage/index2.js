import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css"
import egg from "./images/egg.png"
import coffee from "./images/drinkThree.png"
import smoothie from "./images/drinkTwo.png"
import drink from "./images/drinkOne.png"
import onions from "./images/onionRings.png"
import vegies from "./images/spinach.png"
import taco from "./images/taco.png"
import cake from "./images/cake.png"
import sandwich from "./images/sandwich.png"
import chicken from "./images/chickenBucket.png"
import croissant from "./images/croissant.png"
import salad from "./images/salad.png"
import pizza from "./images/pizza.png"
import burger from "./images/burger.png"
import salmon from "./images/salmon.png"
import steak from "./images/meat.png"
import pizzaTwo from "./images/pizzaTwo.png"
import south from "./images/chicken.png"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import HomeNav from "./HomeNav";
import HomeFoot from "./HomeFoot";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HomeNavTwo from "./HomeNavTwo";
import ProfileButton from "./ProfileButton";
import Profile from "./Profile";


function HomePageTwo({ arr, title }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants, saves, orders } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ hide, setHide ] = useState(false)
  const [ category, setCategory ] = useState("")
  const dispatch = useDispatch()
  const { location, setProfile, profile, setLocation } = useFilters()
  const history = useHistory()
  const targetRef = useRef()

 useEffect(() => {
     async function fetchData() {
         if ( !location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
         if (user?.id) dispatch(restaurantActions.thunkGetSaves())
         console.log('hello?')
         if (user?.id) dispatch(restaurantActions.thunkGetOrders())
        }
     fetchData()

  }, [dispatch, location, user])

  useEffect(() => {
    const place = localStorage.getItem('place');
    if (place) {
      setLocation(place);
    }
  }, [location]);

    const goToNextTwo = (e) => {
        e.stopPropagation()
        setLengthTwo(lengthTwo + 1)

    };

    const goToPrevTwo = (e) => {
        e.stopPropagation();
        setLengthTwo(lengthTwo - 1)
    };

  const sliderStyleTwo = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${lengthTwo * 50}%)`,
  };

  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
  };

  let franchises = Object.values(restaurants).sort((a, b) => a.miles - b.miles)

  if (category) {
    franchises = franchises.filter((f) => f.type.includes(category))
  }

  const reviews = (reviews) => {

    if (!reviews.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };

  console.log(category)



  return (

    <div className="types">
    { arr.length > 0 && !category && <div style={{ overflow: "hidden"}} className="saved">
    <div style={{ boxSizing: "border-box"}} id="saved">
    <h1 style={{ fontSize: "26px"}}>{title}</h1>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", fontSize: "14px", fontWeight: "600"}}>
            <p>See All</p>
            <span style={{ display: "flex", gap: "10px", boxSizing: "border-box"}}>
                { <i id="gotobutt-two" style={{ left: "0"}} onClick={goToPrevTwo} class="fi fi-sr-angle-circle-left"></i>}
                { <i id="gotobutt-two" style={{ right: "0" }} onClick={goToNextTwo} class="fi fi-sr-angle-circle-right"></i>}
            </span>
        </div>
    </div>
    <div style={sliderStyleTwo} id="saves">
    {arr.map((f, id) =>
        <>
            <div style={{ height: "100%"}} onClick={(() => history.push(`/restaurant/${f.id}`))} className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px"}}src={f.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    { user && f.Saves?.some((s) => s.userId == user?.id && s.restaurantId == f.id) ?
                    <i onClick={((e) => {
                        e.stopPropagation()
                        deleteSave(f.Saves, f.id)})} style={{ color: "red", fontSize: "16px", margin: "4px"}} class="fi fi-ss-heart"></i> :
                    <i onClick={((e) => {
                        e.stopPropagation()
                        saveRestaurant(f.id)})} style={{ color: "#767676", fontSize: "16px", margin: "4px"}} class="fi fi-rs-heart"></i>
                    }
                </div>
                <div id="r-info">
                    <h1 style={{ fontSize: "12px"}}>
                    <span style={{ color: "black"}}>{reviews(f.Reviews)}</span>
                    <i class="fi fi-sr-star" style={{ fontSize: "12px", color: "#e4e404" }}></i>
                    ({f.Reviews?.length})
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    {f.miles} mi
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    {f.mins + 10} mins
                    </h1>
                </div>
                <h1 style={{ fontSize: "12px", color: "#767676"}}>${f.deliveryFee} Delivery Fee</h1>
            </div>
        </>
        )}
    </div>
    </div>}

    </div>

  );
}

export default HomePageTwo;
