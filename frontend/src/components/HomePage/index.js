import React, { useEffect, useState } from "react";
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
import * as resturantActions from "../../store/restaurants";
import HomeNav from "./HomeNav";
import HomeFoot from "./HomeFoot";


function HomePage({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { restaurants } = useSelector((state) => state.restaurants);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage ] = useState(0)
  const [ length, setLength ] = useState(0)
  const dispatch = useDispatch()



 useEffect(() => {
     async function fetchData() {
         await dispatch(resturantActions.thunkGetResturants())
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

  const franchises = Object.values(restaurants)

  console.log(restaurants)


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
            <div className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px", height: "60%" }}src={f.ResturantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    <i style={{ color: "#767676", fontSize: "15px", margin: "4px"}} class="fi fi-rs-heart"></i>
                </div>
                <div id="r-info">
                    <h1 style={{ fontSize: "12px"}}>
                    <span style={{ color: "black"}}>4.5</span>
                    <i class="fi fi-sr-star" style={{ fontSize: "12px", color: "#e4e404" }}></i>
                    ({f.Reviews?.length})
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    8.1 mi
                    <i style={{ width: "10px", height: "10px" }} class="fi fi-sr-bullet"></i>
                    44 mins
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
