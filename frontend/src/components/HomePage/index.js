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


function HomePage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurants, saves, orders } = useSelector((state) => state.restaurants);
  const [ length, setLength ] = useState(0)
  const [ lengthTwo, setLengthTwo ] = useState(0)
  const [ index, setIndex ] = useState(0)
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


  const goToNext = (e) => {
      e.stopPropagation()
      setLength(length + 1)

    };

    const goToPrev = (e) => {
        e.stopPropagation();
        setLength(length - 1)
    };

    const goToNextTwo = (e) => {
        e.stopPropagation()
        setLengthTwo(lengthTwo + 1)

    };

    const goToPrevTwo = (e) => {
        e.stopPropagation();
        setLengthTwo(lengthTwo - 1)
    };

  const sliderStyle = {
    maxWidth: "100%",
    display: "flex",
    transition: "transform 0.5s ease",
    transform: `translateX(-${length * 50}%)`,
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

  let saved = []

  if (Object.values(saves).length) {
    for (let save of Object.values(saves)) {
        saved.push(save.Restaurant)
    }
  }

  let ordered = []
  let set = new Set()

  if (Object.values(orders).length) {
    for (let order of Object.values(orders)) {
        if (!set.has(order.Restaurant.name)) {
            ordered.push(order.Restaurant)
            set.add(order.Restaurant.name)
        }
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



  return (
    <div style={{ position: "relative"}}>
    {user ? <HomeNavTwo /> : <HomeNav /> }
    <div style={{ display: "flex"}} >
    <div className="side-bar" style={{ position: "sticky", height: "100vh", top: "64px", zIndex: 10}}>

    { user?.id && <div id="side-bar">
        <span className="page">
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

    <div style={{ padding: !user?.id ? "0.4% 9.5%" : "0.4% 2%"}} className="hp">
    <div className="food-type">
    { length > 0 && <i id="gotobutt" style={{ left: "0"}} onClick={goToPrev} class="fi fi-sr-angle-circle-left"></i>}
    <div style={sliderStyle} id="food-type">
    <span onMouseEnter={(() => setIndex(1))} onClick={(() => setCategory("Breakfast"))} id="categories">
    <img style={{ transform: category == "Breakfast" ? "rotate(20deg)": "" }}className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={egg}></img>
    <p style={{ color: category == "Breakfast" ? "red" : "" }} >Breakfast</p>
    </span>
    <span onMouseEnter={(() => setIndex(2))} onClick={(() => setCategory("Coffee"))} id="categories">
    <img style={{ transform: category == "Coffee" ? "rotate(-20deg)": "" }}className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={coffee}></img>
    <p style={{ color: category == "Coffee" ? "red" : "" }} >Coffee</p>
    </span>
    <span  onMouseEnter={(() => setIndex(3))} onClick={(() => setCategory("Fast Food"))} id="categories">
    <img style={{ transform: category == "Fast Food" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={onions}></img>
    <p style={{ color: category == "Fast Food" ? "red" : ""  }} >Fast Food</p>
    </span>
    <span onMouseEnter={(() => setIndex(4))} onClick={(() => setCategory("Vegan"))} id="categories">
    <img  style={{ transform: category == "Vegan" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={vegies}></img>
    <p style={{ color: category == "Vegan" ? "red" : ""  }} >Vegan</p>
    </span>
    <span onMouseEnter={(() => setIndex(5))} onClick={(() => setCategory("Smoothie"))} id="categories">
    <img  style={{ transform: category == "Smoothies" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={smoothie}></img>
    <p style={{ color: category == "Smoothies" ? "red" : ""  }} >Smoothie</p>
    </span>
    <span onMouseEnter={(() => setIndex(6))} onClick={(() => setCategory("Mexican"))} id="categories">
    <img style={{ transform: category == "Mexican" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={taco}></img>
    <p style={{ color: category == "Mexican" ? "red" : "" }} >Mexican</p>
    </span>
    <span onMouseEnter={(() => setIndex(7))} onClick={(() => setCategory("Desserts"))} id="categories">
    <img style={{ transform: category == "Desserts" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={cake}></img>
    <p style={{ color: category == "Desserts" ? "red" : "" }} >Desserts</p>
    </span>
    <span onMouseEnter={(() => setIndex(8))} onClick={(() => setCategory("Sandwiches"))} id="categories">
    <img style={{ transform: category == "Sandwhiches" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={sandwich}></img>
    <p style={{ color: category == "Sandwiches" ? "red" : ""  }}  >Sandwiches</p>
    </span>
    <span onMouseEnter={(() => setIndex(9))} onClick={(() => setCategory("Chicken"))} id="categories">
    <img style={{ transform: category == "Chicken" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={chicken}></img>
    <p style={{ color: category == "Chicken" ? "red" : "" }}  >Chicken</p>
    </span>
    <span onMouseEnter={(() => setIndex(10))} onClick={(() => setCategory("Bakery"))}id="categories">
    <img style={{ transform: category == "Bakery" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={croissant}></img>
    <p style={{ color: category == "Bakery" ? "red" : ""  }}  >Bakery</p>
    </span>
    <span onMouseEnter={(() => setIndex(11))} onClick={(() => setCategory("Healthy"))}id="categories">
    <img style={{ transform: category == "Healthy" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={salad}></img>
    <p style={{ color: category == "Healthy" ? "red" : ""  }}  >Healthy</p>
    </span>
    <span onMouseEnter={(() => setIndex(12))} onClick={(() => setCategory("Asian"))}id="categories">
    <img style={{ transform: category == "Asian" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src="https://media1.giphy.com/media/VJZeYN1kHRDLjfwCH2/giphy.gif?cid=6c09b952glr8drzqy88rupfm9cgb5nnzkrv7up0oz3g7iz42&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"></img>
    <p style={{ color: category == "Asian" ? "red" : ""  }}  >Asian</p>
    </span>
    <span onMouseEnter={(() => setIndex(13))} onClick={(() => setCategory("Pizza"))}id="categories">
    <img style={{ transform: category == "Pizza" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={pizza}></img>
    <p style={{ color: category == "Pizza" ? "red" : ""  }}  >Pizza</p>
    </span>
    <span onMouseEnter={(() => setIndex(14))} onClick={(() => setCategory("Burgers"))} id="categories">
    <img style={{ transform: category == "Burgers" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={burger}></img>
    <p style={{ color: category == "Burgers" ? "red" : ""  }} >Burgers</p>
    </span>
    <span onMouseEnter={(() => setIndex(15))} onClick={(() => setCategory("Steak"))} id="categories">
    <img style={{ transform: category == "Steak" ? "rotate(20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={steak}></img>
    <p style={{ color: category == "Steak" ? "red" : ""  }} >Steak</p>
    </span>
    <span onMouseEnter={(() => setIndex(16))} onClick={(() => setCategory("Seafood"))} id="categories">
    <img style={{ transform: category == "Seafood" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={salmon}></img>
    <p style={{ color: category == "Seafood" ? "red" : ""  }} >Seafood</p>
    </span>
    <span onMouseEnter={(() => setIndex(17))} onClick={(() => setCategory("Italian"))} id="categories">
    <img style={{ transform: category == "Italian" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={pizzaTwo}></img>
    <p style={{ color: category == "Italian" ? "red" : ""  }} >Italian</p>
    </span>
    <span onMouseEnter={(() => setIndex(18))} onClick={(() => setCategory("Southern"))} id="categories">
    <img style={{ transform: category == "Southern" ? "rotate(-20deg)": "" }} className={index % 2 === 0 ? "rotate-left-on-hover" : "rotate-right-on-hover"} src={south}></img>
    <p style={{ color: category == "Southern" ? "red" : ""  }} >Southern</p>
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
    { saved.length > 0 && !category && <div style={{ overflow: "hidden"}} className="saved">
    <div style={{ boxSizing: "border-box"}} id="saved">
    <h1 style={{ fontSize: "26px"}}>Saved stores</h1>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", fontSize: "14px", fontWeight: "600"}}>
            <p>See All</p>
            <span style={{ display: "flex", gap: "10px", boxSizing: "border-box"}}>
                { <i id="gotobutt-two" style={{ left: "0"}} onClick={goToPrevTwo} class="fi fi-sr-angle-circle-left"></i>}
                { <i id="gotobutt-two" style={{ right: "0" }} onClick={goToNextTwo} class="fi fi-sr-angle-circle-right"></i>}
            </span>
        </div>
    </div>
    <div style={sliderStyleTwo} id="saves">
    {saved.map((f, id) =>
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
    { ordered.length > 0 && !category && <div style={{ overflow: "hidden"}} className="saved">
    <div style={{ boxSizing: "border-box"}} id="saved">
    <h1 style={{ fontSize: "26px"}}>Order it again</h1>
        <div style={{ display: "flex", gap: "18px", alignItems: "center", fontSize: "14px", fontWeight: "600"}}>
            <p>See All</p>
            <span style={{ display: "flex", gap: "10px", boxSizing: "border-box"}}>
                { <i id="gotobutt-two" style={{ left: "0"}} onClick={goToPrevTwo} class="fi fi-sr-angle-circle-left"></i>}
                { <i id="gotobutt-two" style={{ right: "0" }} onClick={goToNextTwo} class="fi fi-sr-angle-circle-right"></i>}
            </span>
        </div>
    </div>
    <div style={sliderStyleTwo} id="saves">
    {ordered.map((f, id) =>
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
    { category ? <div id="results">
    <h1 style={{ fontSize: "26px"}}>{franchises.length} results</h1>
    <button onClick={(() => setCategory(""))}>Reset</button>
    </div> : <div><h1 style={{ fontSize: "32px"}}>All Stores</h1></div> }
    </div>
    <div className="restaurants">
        {franchises.map((f, id) =>
        <>
            <div onClick={(() => history.push(`/restaurant/${f.id}`))} className="restaurant" id={`r-${id}`}>
                <img style={{ marginBottom: "6px", height: "58%" }}src={f.RestaurantImage?.thumbnailUrl}></img>
                <div id="r-name">
                    <h1 style={{ fontSize: "16px", margin: "2px 0px"}} >{f.name} </h1>
                    { user?.id && <>
                    { user && f.Saves?.some((s) => s.userId == user?.id && s.restaurantId == f.id) ?
                    <i onClick={((e) => {
                        e.stopPropagation()
                        deleteSave(f.Saves, f.id)})} style={{ color: "red", fontSize: "16px", margin: "4px"}} class="fi fi-ss-heart"></i> :
                    <i onClick={((e) => {
                        e.stopPropagation()
                        saveRestaurant(f.id)})} style={{ color: "#767676", fontSize: "16px", margin: "4px"}} class="fi fi-rs-heart"></i>
                    }
                    </>}
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
    { user?.id && <HomeFoot />}
    </div>
    </div>
    { !user?.id && <HomeFoot />}
    </div>
  );
}

export default HomePage;
