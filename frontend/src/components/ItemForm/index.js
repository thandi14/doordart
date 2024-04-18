import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import * as cartActions from "../../store/shoppingcart";
import * as restaurantActions from "../../store/restaurants";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ItemForm.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFilters } from "../../context/Filters";

function ItemFormModal({ itemId }) {
  const dispatch = useDispatch();
  const { restaurant }  = useSelector((state) => state.restaurants);
  const { cartItem, shoppingCart }  = useSelector((state) => state.cart);
  const { closeModal } = useModal();
  const history = useHistory()
  const [ quantity, setQuantity ] = useState(1)
  const [items, setItems] = useState({});
  const { setItem, setCount } = useFilters()
  const [ data, setData ] = useState({})
  const [ validation, setValidation ] = useState(0)
  const [ optionIds, setOptionIds ] = useState([]);


  let options = cartItem.ItemOptions

  const addItem = (selection, option) => {
    let num = option.id
    const newArray = [...optionIds, num];
    setOptionIds(newArray)
    const currentArray = items[num]?.length ? items[num] : [];
    const updatedArray = [...currentArray, selection.id];

    if (updatedArray.length > option.number && selection.optionId === option.id) {
      updatedArray.shift();
    }

    setItems({
      ...items,
      [num]: updatedArray
    });
  };

   useEffect(() => {
    async function validateItem() {
        let required = 0
        let ops = Object.values(cartItem.ItemOptions)
        for (let o of ops) {
            if (o.required) required++
        }
        setValidation(required)
    }
    validateItem()

  }, [dispatch, itemId, options])

  useEffect(() => {
    async function fetchData() {
         await dispatch(cartActions.thunkGetItem(itemId))
         await dispatch(cartActions.thunkGetCart(restaurant.id))
       }
    fetchData()

  }, [dispatch, itemId])

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setCount(quantity)
    setItem(cartItem)
    let selections = Object.values(items)
    const ops = [].concat(...selections);
    let data = { itemId, options: ops, quantity }
    let data1
    if (!shoppingCart?.id) {
        data1 = await dispatch(cartActions.thunkCreateCart(restaurant.id))
        if (data1) await dispatch(cartActions.thunkCreateCartItem(data1.id, data))
    }
    if (shoppingCart?.id) await dispatch(cartActions.thunkCreateCartItem(shoppingCart.id, data))
    closeModal()
  };

  return (
    <div className="item-modal">
        <div id="close-item">
        <i onClick={(() => closeModal())} class="fi fi-br-cross"></i>
        </div>
        <div id="item-modal">
        <div className="item-one">
            <h1>{cartItem.item}</h1>
            {cartItem.cals && <p>{cartItem.cals} cal</p>}
            <p>{cartItem.description}</p>
        </div>
        <img style={{ width: "100%", marginBottom: "20px" }} src={cartItem.imgUrl}></img>
        <div className="item-two">
            {options?.length > 0 && options.map((option) =>
            <>
                <div id="item-options">
                    <h2 style={{ fontSize: "15px", margin: "0px" }}>{option.option}</h2>
                        <p style={{ margin: "6px 0px", gap: "3px", color: "#767676", fontSize: "11px", display: "flex", alignItems: "center"}}>
                            <span style={{ gap: "3px", display: "flex", alignItems: "center", color: optionIds.some((id) => option.id == id) ? "green" : "gold", fontSize: "11px"}}>
                                { optionIds.some((id) => option.id == id) ? <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-check-circle"></i> :
                                <i style={{ width: "12px", height: "12px", fontSize: "12px" }} class="fi fi-sr-triangle-warning"></i>}
                                {option.required ? "Required" : "(Optional)"}</span>
                                <i style={{ width: "8px", height: "8px", fontSize: "8px" }} class="fi fi-sr-bullet"></i>
                            Select {option.number}
                        </p>
                    {option.ItemSelections?.map((selection) =>
                        <div onClick={(()=> addItem(selection, option))} id="item-selection">
                            {
                            items[option.id]?.some((i) => i == selection.id) ?
                            <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-bs-dot-circle"></i> :
                            <i style={{ width: "16px", height: "16px", fontSize: "16px" }} class="fi fi-rr-circle"></i>
                            }
                            <div>
                                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                                {selection.selection}
                                </p>
                                <p style={{ fontSize: "12px", color: "#767676", fontWeight: "500" }}>
                                {selection.cals ? selection.cals : selection.price}
                                </p>
                            </div>
                        </div>
                    ).reverse()}
                </div>
            </>
            )
            }

        </div>
        </div>
        <div id="buy-item">
            <div>
                <i style={{ curser: quantity == 1 ? "not-allowed" : "pointer" }} onClick={(() => {
                    if (quantity == 1) {
                        setQuantity(1)
                    }
                    else {
                        setQuantity(quantity - 1)
                    }
                })} class="fi fi-rr-minus-circle"></i>
                <span>
                    {quantity}
                    </span>
                <i onClick={(() => setQuantity(quantity + 1))} class="fi fi-rr-add"></i>
            </div>
            <button onClick={(() => {
                 if (Object.keys(items).length == validation) {
                    handleSubmit()
                 }
            })}>
                {Object.keys(items).length == validation ? "Add to cart" : `Make ${validation - Object.keys(items).length} required selections` } - ${cartItem.price * quantity}
            </button>
        </div>
    </div>
  );
}

export default ItemFormModal;
