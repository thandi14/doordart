import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "./Navigation.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory()

  return (
    <>
    <div id="nav">
        <ProfileButton user={sessionUser} />
        <div onClick={(() => history.push('/'))} id="icon">
        <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
          DoorDart
        </div>
        <div id="pick">
            <button>
                Pickup
            </button>
            <button>
                Delivery
            </button>
        </div>
        <div id="line"></div>
        <div id="my-address">
        <h1 style={{ fontSize: "14px" }}>1740 hickory chase cir</h1>
        <i class="fi fi-rr-angle-small-down"></i>
        </div>
        <div id="search">
            <i class="fi fi-rr-search"></i>
            <input defaultValue="Search stores, dishes, products"></input>
        </div>
        <i class="fi fi-rr-cowbell"></i>
        <i class="fi fi-rr-shopping-cart"></i>
    </div>
    </>
  );
}

export default Navigation;
