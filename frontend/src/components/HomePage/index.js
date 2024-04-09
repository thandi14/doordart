import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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



function HomePage({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);



  return (
    <div className="hp">
    <div className="food-type">
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
    <p>Latin</p>
    </div>
    </div>
  );
}

export default HomePage;
