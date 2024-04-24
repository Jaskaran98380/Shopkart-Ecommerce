import React , {Fragment} from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard.js"
import { useDispatch , useSelector} from 'react-redux'
import { addItemsToCart } from '../../actions/cartAction.js'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartItems} = useSelector((state)=>state.cart)
  // const item={
  //   name:"item2",
  //   price:200,
  //   id:"productId",
  //   image:"https://i.pinimg.com/736x/a9/bb/cb/a9bbcb6d32932819a8f6b09e03ef76b1.jpg",
  //   quantity:1
  // }
  const increase=(id , stock ,quantity)=>{
    const newQty = quantity + 1;
    if(stock<=quantity)return;
    
    dispatch(addItemsToCart(id , newQty));
  }
  const decrease=(id , quantity)=>{
    const newQty = quantity - 1;
    if(1>=quantity)return;
    
    dispatch(addItemsToCart(id , newQty));
  }
  const checkOutHandler = ()=>{
    navigate("/login?redirect=shipping");
  }
  return (<Fragment>
    {cartItems.length===0?(
      <div className="emptyCart">
        <RemoveShoppingCartIcon />
        <p>No products in the cart.</p>
        <Link to = "/products" >Add Products</Link>
      </div>
    ):(
      <Fragment>
      <div className="cartPage">
      <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>Sub-Total</p>
      </div>
      {cartItems && cartItems.map((item)=>(
             <div className="cartContainer">
             <div>
             <CartItemCard item={item} />
             </div>
                
           <div className="cartInput">
           <button className="red" onClick={()=>decrease(item.product , item.quantity)}>-</button>
           <input value={item.quantity} type="number" />
           <button className="green" onClick={()=>increase(item.product , item.stock , item.quantity)}>+</button>
           </div>
           <div className="cartTotal">
             <p>{`Rs.${item.quantity * item.price}`}</p>
           </div>
       </div>
     
      ))}
         <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`Rs.${cartItems.reduce((acc , item)=> acc + item.quantity * item.price , 0)}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
 
</div>
      </Fragment>
    )}
    
  </Fragment>
   
  )
}

export default Cart