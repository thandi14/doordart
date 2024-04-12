import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as restaurantActions from "../../store/restaurants";
import { useFilters } from "../../context/Filters";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./RestaurantPage.css"
import RestaurantNav from "./RestaurantNav";

function RestaurantPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurant } = useSelector((state) => state.restaurants);
  const { id } = useParams();
  const [ length, setLength ] = useState(0)
  const [ selection, setSelection ] = useState("Combo Meals")
  const dispatch = useDispatch()
  const { location } = useFilters()
  const targetRef = useRef()

 useEffect(() => {
     async function fetchData() {
            let data = {
                address: location
            }
          await dispatch(restaurantActions.thunkGetRestaurant(id, data))
        }
     fetchData()

  }, [dispatch, location, id])


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

//   const franchises = Object.values(restaurants).sort((a, b) => a.miles - b.miles)

  const reviews = (reviews) => {

    if (!reviews?.length) return 0

    let sum = 0
    for (let review of reviews) {
        sum += review.rating
    }

    let result = sum / reviews.length

    return result.toFixed(1)

  };

  let times = restaurant.RestaurantTime?.monday
  let time = ""
  let morning = ""
  let night = ""

    if (time) {
        time = times.split(" - ")
        morning = time[0]
        night = time[1]
    }

    let menu = restaurant.MenuItems
    let categories = []
    let set = new Set()

    if (menu?.length) {

        for ( let item of menu ) {
            if (!set.has(item.category)) {
                categories.push(item.category)
                set.add(item.category)
            }
        }

    }

    let items = []

    if (menu?.length) items = menu.filter((i) => i.category == selection)


    console.log(items)


  return (
    <div style={{ position: "relative"}}>
    <RestaurantNav />
        <div className="rp">
            <div style={{ backgroundImage: `url(${restaurant.RestaurantImage?.bannerUrl})`}} id="rp-one">
                <div id="rp-ban">
                     <img src={restaurant.RestaurantImage?.iconUrl}></img>
                </div>
                <div id="rp-save">
                    <button><i class="fi fi-rs-heart"></i>Save</button>
                </div>
            </div>
            <div id="rp-two">
                <div id="r-info">
                    <div id="info-one">
                        <h1>{restaurant.name}</h1>
                        <h2 style={{ fontSize: "20px", whiteSpace: "nowrap"}}>Store Info</h2>
                        <p style={{ fontSize: "12px", color: "#767676"}}>
                             <i style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}} class="fi fi-rr-clock-three"></i>
                            <p style={{ fontSize: "12px", color: "green", margin: "0px"}}>Open now</p>
                            <i style={{ width: "8px", height: "8px", fontSize: "8px", color: "#767676" }} class="fi fi-sr-bullet"></i>
                            Closes at {night}
                        </p>
                        <p style={{ color: "#767676", fontSize: "12px",}}>
                            {reviews(restaurant.Reviews)}
                            <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}}></i>
                            {restaurant.Reviews?.length}+
                            ratings
                            <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            {restaurant.miles} mi
                        </p>
                        <p style={{ color: "#767676", fontSize: "12px",}}>
                            $
                            <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            American
                        </p>
                        <p style={{ fontSize: "12px", color: "#767676" }}>Pricing & fees</p>
                    </div>
                    <div id="info-two">
                            <h1 style={{ fontSize: "20px", whiteSpace: "nowrap", display: "flex" }}>Lunch Menu <i class="fi fi-rr-angle-small-down"></i></h1>
                            <p style={{ fontSize: "12px", color: "#767676"}}>{restaurant.RestaurantTime?.monday}</p>
                            <span style={{ fontSize: "12px"}}>
                            <p>Order it again</p>
                            <p>Item Deals</p>
                            <p>Reviews</p>
                            <p>Most Ordered</p>
                            {categories.map((category, i) =>
                            <p>{category}</p>
                            )}
                            </span>
                    </div>
                </div>
                <div id="r-items">
                    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%"}}>
                        <div id="item-search">
                        <i class="fi fi-rr-search"></i>
                        <input placeholder={`Search ${restaurant.name}`}></input>
                        </div>
                    </div>
                    <div id="group">
                        <button>Group Order</button>
                        <div>
                            <span>
                            <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", display: "flex", margin: "0px" }}>${restaurant.deliveryFee}</h1>
                            <h2 style={{ fontSize: "12px", color: "#767676", margin: "0px" }}>delivery fee</h2>
                            </span>
                            <div id="line-four"></div>
                            <span>
                            <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", display: "flex", margin: "0px" }}>{restaurant.deliveryTime + 10} min</h1>
                            <h2 style={{ fontSize: "12px", color: "#767676", margin: "0px"}}> delivery time</h2>
                            </span>
                        </div>
                    </div>
                    <div style={{ margin: "20px 0px" }} className="menu">
                        <h1 style={{ fontSize: "20px", whiteSpace: "nowrap" }}>{selection}</h1>
                        <div className="item">
                            { items.map((item, i) =>
                                <>
                                <div id="menu-item">
                                    <div id="item">
                                    <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", margin: "0" }}>{item.item}</h1>
                                    <div id="i-info">
                                    <p style={{ fontSize: "12px"}}>{item.description}</p>
                                    </div>
                                    <span style={{ fontSize: "12px"}}>
                                        <p>${item.price}</p>
                                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                                        <p>92% (7)</p>
                                    </span>
                                    </div>
                                    <div id="i">
                                        <img src={item.imgUrl}></img>
                                        <i class="fi fi-sr-add"></i>
                                    </div>
                                </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/* <HomeFoot /> */}
    </div>
  );
}

export default RestaurantPage;
