import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../HomePage/HomePage.css"
import * as restaurantActions from "../../store/restaurants";
import * as cartActions from "../../store/shoppingcart";
import { useFilters } from "../../context/Filters";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import HomeNav from "../HomePage/HomeNav";
import HomeFoot from "../HomePage/HomeFoot";
import Profile from "../HomePage/Profile";
import HomeNavTwo from "../HomePage/HomeNavTwo";
import "./SearchPage.css"


function SearchPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants, saves, searchs } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ index, setIndex ] = useState(0)
  const [ mark, setMark ] = useState(0)
  const dispatch = useDispatch()
  const { location, setRecentId, profile, setProfile } = useFilters()
  const history = useHistory()
  const targetRef = useRef()

 useEffect(() => {
     async function fetchData() {
         if ( !location && user?.id ) await dispatch(restaurantActions.thunkGetUserRestaurants())
         dispatch(cartActions.thunkGetCarts())
         dispatch(restaurantActions.thunkGetSaves())
        }
     fetchData()

  }, [dispatch, location, user])

  const saveRestaurant = (id) => {
    dispatch(restaurantActions.thunkCreateSave(id))

  };

  const deleteSave = (saves, restaurantId) => {
    let save = saves.find((s) => s.userId == user.id)
    dispatch(restaurantActions.thunkDeleteSave(save.id, restaurantId))
  };

  let saved = []

  if (Object.values(saves).length) {
    for (let save of Object.values(saves)) {
        saved.push(save.Restaurant)
    }
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

  let searched = Object.values(searchs)


  return (
    <div style={{ position: "relative"}}>
    {user ? <HomeNavTwo /> : <HomeNav /> }
    <div style={{ display: "flex"}}>
    <div className="side-bar" style={{ position: "sticky", height: "100vh", top: "64px", zIndex: 10}}>

{ user?.id && <div id="side-bar">
    <span onClick={(() => history.push('/home'))} className="page">
        <i class="fi fi-rs-house-chimney"></i>
        <p>Home</p>
    </span>
    <span>
        <i class="fi fi-rr-apple-whole"></i>
        <p>Grocery</p>
    </span>
    <span>
        <i class="fi fi-rr-shopping-bag"></i>
        <p>Retail</p>
    </span>
    <span>
         <i class="fi fi-rr-hamburger-soda"></i>
        <p>Convenience</p>
    </span>
    <span>
        <i class="fi fi-rr-glass-cheers"></i>
        <p>Alcohol</p>
    </span>
    <span>
    <i class="fi fi-rr-tags"></i>
        <p>Offers</p>
    </span>
    <span>
    <i class="fi fi-rr-lipstick"></i>
        <p>Beauty</p>
    </span>
    <span>
        <i class="fi fi-rr-paw"></i>
        <p>Pets</p>
    </span>
    <span>
    <i class="fi fi-rr-search-alt"></i>
    <p>Browse All</p>
    </span>
    <div id="line-bar"></div>
    <span>
        <i id="notify" class="fi fi-rr-cowbell"></i>
        <p>Notifications</p>
    </span>
    <span>
        <i class="fi fi-rr-receipt"></i>
        <p>Orders</p>
    </span>
    <span onClick={(() => setProfile(true))} >
        <i class="fi fi-rr-user"></i>
        <p>Account</p>
    </span>
    { profile && <div ref={targetRef} style={{ left: "220px"}}  id="profile-modal">
        <Profile user={user} d={profile} />
    </div>}
</div>}
    </div>
    <div className="search-page">

       { searched.length > 0 && <div style={{ position: "sticky", width: "100%", top: "64px"}} >
        <div id="sp-head">
            <div id="types-two">
                <p id="s-categories" onClick={(() => {
                    // setScroll(true)
                    setMark(0)
                    })}  style={{ position: "relative"}}>
                    <div id={mark == 0 ? "mark-two" : "hidden"}></div>
                    <p style={{ color: mark == 0 ? "black" : "rgb(73, 73, 73)"}}>All</p>
                </p>
                <p id="s-categories" onClick={(() => {
                    // setScroll(true)
                    setMark(1)
                    })}  style={{ position: "relative"}}>
                    <div id={mark == 1 ? "mark-two" : "hidden"}></div>
                    <p style={{ color: mark == 1 ? "black" : "rgb(73, 73, 73)"}}>Restaurant</p>
                </p>
                <p id="s-categories" onClick={(() => {
                    // setScroll(true)
                    setMark(2)
                    })}  style={{ position: "relative"}}>
                    <div id={mark == 2 ? "mark-two" : "hidden"}></div>
                    <p style={{ color: mark == 2 ? "black" : "rgb(73, 73, 73)"}}>Grocery</p>
                </p>
                <p id="s-categories" onClick={(() => {
                    // setScroll(true)
                    setMark(3)
                    })}  style={{ position: "relative"}}>
                    <div id={mark == 3 ? "mark-two" : "hidden"}></div>
                    <p style={{ color: mark == 3 ? "black" : "rgb(73, 73, 73)"}}>Retail</p>
                </p>
            </div>
            <div id="search-t">
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
                </div>
            </div>
        </div>}
    <div style={{ height: "100%", width: "100%", padding: "0px"}} className="hp">
    <div style={{ padding: "0.4% 2%"}} className="restaurants">
        {searched.length == 0 ? <div id="no-results">
            <img src="https://media3.giphy.com/media/Uj3qigQZ3aYkK1dbz4/giphy.gif?cid=6c09b9527rmk8o3ivw71840rvk02ag0e8vkvqgdbs3zosfb5&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"></img>
            <h1 style={{ margin: "0px 4px"}}>No Results</h1>
            <p>Try a different search or browse everything
                DoorDash offers in your area.</p>
            <button id="browse-again" onClick={(() => history.push('/home'))}>Browse DoorDart</button>
        </div> :
        <>
         {searched.map((f, id) =>
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
        </>

        }
    </div>
    </div>
    <HomeFoot />
    </div>
    </div>
    </div>
  );
}

export default SearchPage;
