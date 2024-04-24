import React from 'react'
import "./CartItemCard.css"
import { removeItemsFromCart } from '../../actions/cartAction'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const CartItemCard = ({item}) => {
    const dispatch = useDispatch();
    const deleteItem = (id)=>{
        dispatch(removeItemsFromCart(id));
    }
  return (
    <div className="cartItemCard">
        <img src={item.image} alt="image" />
        <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link> 
        <p>{`Rs.${item.price}`}</p>
        <p onClick={()=>deleteItem(item.product)}>Remove</p>
        </div>  
    </div>
  )
}

export default CartItemCard