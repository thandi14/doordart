import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SplashFoot({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);



  return (
    <>
    <div className="sp-foot">
        <div>
            <h1 style={{ fontSize: "16px", color: "white" }}>Popular Categories</h1>
        </div>
        <div id="foot-one">
            <span>
                <p>Alchol Delivery</p>
                <p>Back To School Delivery</p>
                <p>Beauty Stores</p>
                <p>Beauty Supplies</p>
                <p>Catering Near Me</p>
            </span>
            <span>
                <p>Convenience Stores Canada</p>
                <p>Dashmart Near Me</p>
                <p>Deck The Doorstep</p>
                <p> Drugstores Canada</p>
                <p>Flower Delivery</p>
            </span>
            <span>
                <p>Grocery Delivery Canada</p>
                <p>Halloween</p>
                <p>Medicine Delivery</p>
                <p>Pet Store Near Me</p>
                <p>Retail Stores Near Me</p>
            </span>
            <span>
                <p>Seasonal Holidays </p>
                <p>Snap Ebt </p>
                <p>Valentines Day</p>
            </span>
        </div>
        <div>
{/*
        <div style={{ display: "flex", justifyContent: "space-between" }}>

        </div> */}
        <div id="foot-two">
            <span>
            <h1 style={{ fontSize: "16px", color: "white" }}>Get To Know Us</h1>
                <p>About Us</p>
                <p>Careers</p>
                <p>Investors</p>
                <p>Company Blog</p>
                <p>Engineering Blog</p>
                <p>Merchant Blog</p>
                <p>Gift Cards</p>
                <p>Package Pickup</p>
                <p>Promotions</p>
                <p>Dasher Central</p>
                <p>LinkedIn</p>
                <p>Glassdoor</p>
                <p>Accessibility</p>
                <p>Newsroom</p>
            </span>
            <span>
            <h1 style={{ fontSize: "16px", color: "white" }}>Let Us Help You</h1>
                <p>Account Details</p>
                <p>Order History</p>
                <p>Help</p>
            </span>
            <span>
            <h1 style={{ fontSize: "16px", color: "white" }}>Doing Businesses</h1>
                <p>Become a Dasher</p>
                <p>List Your Business</p>
                <p>Get Dashers for Deliveries</p>
                <p>Get DoorDash for Business</p>
            </span>
        </div>
        <div id="foot-three">
            <img src="https://www.pngall.com/wp-content/uploads/15/Door-Dash-Logo-PNG-Photo.png"></img>
            <span id="ft-one">
            <p>Terms of Service</p>
            <p>Privacy</p>
            <p>Delivery Locations</p>
            <p>Do Not Sell or Share My Personal Information</p>
            <p>© 2024 DoorDash</p>
            </span>
            <button><i class="fi fi-rs-globe"></i>English (US)<i class="fi fi-rr-angle-small-down"></i></button>
            <span id="ft-two">
            <i class="fi fi-brands-facebook"></i>
            <i class="fi fi-brands-twitter"></i>
            <i class="fi fi-brands-instagram"></i>
            </span>
        </div>
        </div>
    </div>
    </>
  );
}

export default SplashFoot;
