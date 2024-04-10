import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import "./Navigation.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function HomeNav({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
    const history = useHistory()
    const [drop, setDrop] = useState(false)

  return (
    <>
    <ProfileButton user={sessionUser} d={drop} />
    <div id="nav">
        <div className="navi">
        <button onClick={(() => setDrop(!drop))} id ="menu">
        <i class="fi fi-br-menu-burger"></i>
         </button>
        <div id="icon">
        <img src="https://freepnglogo.com/images/all_img/1706201578doordash-icon-png.png"></img>
          <span style={{ paddingRight: "15px", color: "red", fontSize: "18px" }}>DOORDART</span>
        </div>
        <div id="pick">
            <button>
                Delivery
            </button>
            <button>
                Pickup
            </button>
        </div>
        <div id="line"></div>
        <div id="my-address">
        <h1 style={{ fontSize: "14px" }}>1740 hickory chase cir</h1>
        <i class="fi fi-rr-angle-small-down"></i>
        </div>
        </div>
        <div className="search">
        <div id="search">
            <i class="fi fi-rr-search"></i>
            <input defaultValue="Search stores, dishes, products"></input>
        </div>
        <i id="notify" class="fi fi-rr-cowbell"></i>
        <i class="fi fi-rr-shopping-cart"></i>
        </div>
    </div>
    </>
  );
}

export default HomeNav;
