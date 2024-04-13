import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as restaurantActions from "../../store/restaurants";
import { useFilters } from "../../context/Filters";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./RestaurantPage.css"
import RestaurantNav from "./RestaurantNav";
import RestaurantFoot from "./RestaurantFoot";

function RestaurantPage({ isLoaded }) {
  const { user } = useSelector((state) => state.session );
  const { restaurant } = useSelector((state) => state.restaurants);
  const { id } = useParams();
  const [ length, setLength ] = useState(0)
  const [ selection, setSelection ] = useState("Combo Meals")
  const [ mark, setMark ] = useState(0)
  const [ hide, setHide ] = useState(true)
  const [ scroll, setScroll ] = useState(false)
  const dispatch = useDispatch()
  const { location } = useFilters()
  const targetRef = useRef()
  const divRefs = useRef({});

  useEffect(() => {
  window.scrollTo(0, 0); // Scrolls to the top instantly when the page loads
  }, []);

  const checkInCenter = (id) => {
    if (divRefs.current[id]) {
        const element = divRefs.current[id];

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const viewportCenterY = window.scrollY + viewportHeight / 2;
        const isInCenter = elementTop <= viewportCenterY && elementBottom >= viewportCenterY;

        if (isInCenter) {
            const number = parseInt(id.split('-')[1])
            setMark(number);
        }
    }
}

useEffect(() => {
    // Attach scroll event listener when component mounts
    const handleScroll = () => {
        // Loop through each div ref and check if it's in the center
        Object.keys(divRefs.current).forEach(id => {
        checkInCenter(id);
      });
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

}, [mark]);

   useEffect(() => {
     async function fetchData() {
            let data = {
                address: location
            }
          await dispatch(restaurantActions.thunkGetRestaurant(id, data))
        }
     fetchData()

  }, [dispatch, location, id])

  window.addEventListener('scroll', function() {
    const element = document.getElementById('head-nav-two');
    const scrollAmount = 550; // Adjust this value as needed

    // Check if the user has scrolled past the specified amount
    if (window.scrollY > scrollAmount) {
        setHide(false);
    } else {
        setHide(true);
    }
  });

    useEffect(() => {

        const scrollToTarget = () => {
            const handleScrollOrNavigate = () => {
                const targetElement = document.getElementById(`mi-${mark}`);
                if (targetElement && scroll) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    setScroll(false)
                }
            };

            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                handleScrollOrNavigate();
            } else {
                document.addEventListener('DOMContentLoaded', handleScrollOrNavigate);
            }
        };

        scrollToTarget();

    }, [scroll]);



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
    let categories = {};
    let set = new Set();

    if (menu?.length) {
        for (let item of menu) {
            let category = item.category;
            if (!set.has(category)) {
                categories[category] = [];
                set.add(category);
            }
        }

        for (let item of menu) {
            categories[item.category].push(item);
        }
    }

    let keys = Object.keys(categories);

    let items = []

    if (menu?.length) items = menu.filter((i) => i.category == selection)

  return (
    <div style={{ position: "relative"}}>
    <RestaurantNav />
            <div id={ hide ? "hidden" : "rp-head"}>
                        <div style={{ width: "50%", display: "flex", gap: "5px", flexDirection: "column"}}>
                        <h1 style={{ margin: "0px", fontSize: "20px"}} >{restaurant.name}</h1>
                        <p style={{ width: "100%", gap: "4px", margin: "0px", color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
                        {reviews(restaurant.Reviews)}
                        <i class="fi fi-sr-star" style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}}></i>
                        {restaurant.Reviews?.length}+
                        ratings
                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                        {restaurant.type}
                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                        {restaurant.miles} mi
                        </p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", width: "50%", alignItems: "flex-end"}}>
                        <div id="item-search">
                        <i class="fi fi-rr-search"></i>
                        <input placeholder={`Search ${restaurant.name}`}></input>
                        </div>
                    </div>
            </div>
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
                        <h1 style={{ marginBottom: "36px"}} >{restaurant.name}</h1>
                        <h2 style={{ fontSize: "20px", whiteSpace: "nowrap"}}>Store Info</h2>
                        <p style={{ fontSize: "13px", color: "#767676"}}>
                             <i style={{ width: "10px", height: "10px", fontSize: "10px", color: "#767676"}} class="fi fi-rr-clock-three"></i>
                            <p style={{ fontSize: "13px", color: "green", margin: "0px"}}>Open now</p>
                            <i style={{ width: "8px", height: "8px", fontSize: "8px", color: "#767676" }} class="fi fi-sr-bullet"></i>
                            Closes at {night}
                        </p>
                        <p style={{ color: "#767676", fontSize: "13px", display: "flex", alignItems: "center"}}>
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
                        <p style={{ fontSize: "13px", color: "#767676", display: "flex", gap: "5px", alignItems: "center" }}>Pricing & Fees<i style={{ width: "10px", height: "10px", fontSize: "10px" }}  class="fi fi-rr-circle-i"></i></p>
                        <button id="more">See More</button>
                    </div>
                    <div id="line-five"></div>
                    <div id="info-two">
                            <h1 style={{ fontSize: "20px", whiteSpace: "nowrap", display: "flex", alignItems: "center" }}>Lunch Menu <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-rr-angle-small-down"></i></h1>
                            <p style={{ fontSize: "13px", color: "#767676"}}>{restaurant.RestaurantTime?.monday}</p>
                            <span style={{ fontSize: "13px", width: "100%", overflowY: "scroll"}}>
                            {/* <p onClick={(() => {
                                setScroll(true)
                                setMark(-4)
                                })} style={{ position: "relative"}}>
                                <div id={mark == -4 ? "mark" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Order it again</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-3)
                                })}   style={{ position: "relative"}}>
                                <div id={mark == -3 ? "mark" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Item Deals</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-2)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -2 ? "mark" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Reviews</p>
                            </p>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(-1)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == -1 ? "mark" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>Most Ordered</p>
                            </p> */}
                            {keys.map((category, i) =>
                            <p onClick={(() => {
                                setScroll(true)
                                setMark(i)
                                })}  style={{ position: "relative"}}>
                                <div id={mark == i ? "mark" : "hidden"}></div>
                                <p style={{ marginLeft: "16px"}}>{category}</p>
                            </p>
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
                    { keys.map((key, i) =>
                    <div ref={el => divRefs.current[`mi-${i}`] = el} style={{ margin: "20px 0px" }} id={`mi-${i}`} className="menu">
                        <h1 style={{ fontSize: "24px", whiteSpace: "nowrap" }}>{key}</h1>
                        <div className="item">
                            { categories[key].map((item, i) =>
                                <>
                                <div id="menu-item">
                                    <div id="item">
                                    <h1 style={{ fontSize: "16px", whiteSpace: "nowrap", margin: "0" }}>{item.item}</h1>
                                    <div id="i-info">
                                    <p style={{ fontSize: "13px", color: "#767676"}}>{item.description}</p>
                                    </div>
                                    <span style={{ fontSize: "12px"}}>
                                        <p style={{ fontWeight: "700"}}>${item.price}</p>
                                        <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                                        <i style={{ color: "#767676", width: "14px", height: "14px", fontSize: "14px" }}  class="fi fi-br-social-network"></i>
                                        <p style={{ color: "#767676"}}>92% (7)</p>
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
                        )}
                        <div id="print">
                        <p style={{ fontSize: "13px", color: "#767676", margin: "0px"}}> Prices on this menu are set directly by the Merchant.</p>
                        <p style={{ fontSize: "13px", color: "#767676", margin: "0px"}}>2,000 calories a day is used for general nutrition advice, but calorie needs vary. Additional nutrition information available here</p>
                        <p style={{ fontSize: "13px", color: "#767676", margin: "0px"}}>Prices may differ between Delivery and Pickup.</p>
                            <i style={{ width: "24px", height: "24px", fontSize: "24px", marginTop: "10px", marginBottom: "0px" }} class="fi fi-rs-marker"></i>
                        <h1 style={{  marginTop: "0px"}} id="r-addy">{restaurant.type} <h1 style={{ color: "#767676" }}>delivered from</h1> {restaurant.name}%#39;s <h1 style={{ color: "#767676" }}>at</h1> {restaurant.address}</h1>
                        </div>
                </div>
            </div>
        </div>
    <RestaurantFoot />
    </div>
  );
}

export default RestaurantPage;
