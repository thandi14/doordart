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


function HomePage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const dispatch = useDispatch()
  const { location } = useFilters()
  const history = useHistory()

 useEffect(() => {
     async function fetchData() {
         if ( !location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
        }
     fetchData()

  }, [dispatch, location, user])


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

  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
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
    <HomeNav />
    <div className="hp">
    <div className="food-type">
    { length > 0 && <i id="gotobutt" style={{ left: "0"}} onClick={goToPrev} class="fi fi-sr-angle-circle-left"></i>}
    <div style={sliderStyle} id="food-type">
    <span id="categories">
    <img src={egg}></img>
    <p>Breakfast</p>
    </span>
    <span id="categories">
    <img src={coffee}></img>
    <p>Coffee</p>
    </span>
    <span id="categories">
    <img src={onions}></img>
    <p>Fast Food</p>
    </span>
    <span id="categories">
    <img src={vegies}></img>
    <p>Vegan</p>
    </span>
    <span id="categories">
    <img src={smoothie}></img>
    <p>Smoothie</p>
    </span>
    <span id="categories">
    <img src={taco}></img>
    <p>Mexican</p>
    </span>
    <span id="categories">
    <img src={cake}></img>
    <p>Desserts</p>
    </span>
    <span id="categories">
    <img src={sandwich}></img>
    <p>Sandwiches</p>
    </span>
    <span id="categories">
    <img src={chicken}></img>
    <p>Chicken</p>
    </span>
    <span id="categories">
    <img src={croissant}></img>
    <p>Bakery</p>
    </span>
    <span id="categories">
    <img src={salad}></img>
    <p>Healthy</p>
    </span>
    <span id="categories">
    <img src="https://media1.giphy.com/media/VJZeYN1kHRDLjfwCH2/giphy.gif?cid=6c09b952glr8drzqy88rupfm9cgb5nnzkrv7up0oz3g7iz42&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"></img>
    <p>Asian</p>
    </span>
    <span id="categories">
    <img src={pizza}></img>
    <p>Pizza</p>
    </span>
    <span id="categories">
    <img src={burger}></img>
    <p>Burgers</p>
    </span>
    <span id="categories">
    <img src={steak}></img>
    <p>Steak</p>
    </span>
    <span id="categories">
    <img src={salmon}></img>
    <p>Seafood</p>
    </span>
    <span id="categories">
    <img src={pizzaTwo}></img>
    <p>Italian</p>
    </span>
    <span id="categories">
    <img src={south}></img>
    <p>Southern</p>
    </span>
    </div>
    { length == 0 && <i id="gotobutt" style={{ right: "0"}} onClick={goToNext} class="fi fi-sr-angle-circle-right"></i>}
    </div>
    <div className="types">
    <div id="types">
        <button>
            Delivery Fees: Under $3
            <div id="line-two"></div>
            <i class="fi fi-rr-angle-small-down"></i>
        </button>
        <button>
            <i style={{ fontSize: "14px"}} class="fi fi-sr-tags"></i>
            Offers
        </button>
        <button>
            Pickup
        </button>
        <button>
            Over 4.5
            <i style={{ fontSize: "14px"}} class="fi fi-sr-star"></i>
            <div id="line-two"></div>
            <i class="fi fi-rr-angle-small-down"></i>
        </button>
        <button>
            Under 30 min
        </button>
        <button>
            Price
            <i class="fi fi-rr-angle-small-down"></i>
        </button>
        <button>
            DashPass
        </button>
    </div>
    <div id="results">
    <h1 style={{ fontSize: "20px"}}>{franchises.length} results</h1>
    <button>Reset</button>
    </div>
    </div>
    <div className="restaurants">
        {franchises.map((f, id) =>
        <>
            <div onClick={(() => history.push(`/restaurant/${f.id}`))} className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px", height: "58%" }}src={f.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    { user && f.Saves.some((s) => s.userId == user?.id && s.restaurantId == f.id) ?
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
    </div>
    <HomeFoot />
    </div>
  );
}

export default HomePage;
