import React, { Fragment , useEffect } from 'react'
import "./Home.css"
import ProductCard from "./ProductCard.js"
import MetaData from "../layout/MetaData"
import {useSelector , useDispatch} from "react-redux"
import {clearErrors, getProduct} from "../../actions/productAction"
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert"

const Home = () => {
// const product={
//     name:"T-Shirt",
//     images:[{url:"https://thehouseofrare.com/cdn/shop/products/IMG_0053_5c650849-9d9d-4cc3-8863-6a23778cd9a0.jpg?v=1675170808"}],
//     price:1000,
//     _id:"jassi"
// }
const alert = useAlert();
const dispatch = useDispatch();

const { loading, error, products } = useSelector((state) => state.products);
useEffect(()=>{
    if(error){
      return alert.error(error);
      // alert.error(error);
      // dispatch(clearErrors());
    }
    dispatch(getProduct())
},[dispatch , error , alert]);

  return ( 
    <Fragment>
      {loading ? (
        <Loader />
  ):(
        <Fragment>
            <MetaData title="ShopKart" />
            <div className="banner">
                <h1>WELCOME TO <span className="brand">SHOPKART</span></h1>
                <p>Explore Amazing Products Here.</p>
                <a href="#cont"><button>Scroll</button></a>
            </div>
            <h1 id="cont"className="homeHeading">FEATURED PRODUCTS</h1>
            <div className="container">
                {/* <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} />
                <ProductCard product={product} /> */}
    
                {products &&
                  products.map((product) => (
                    <ProductCard  product={product} />
                  ))}
            </div>
            </Fragment>
      )}
    </Fragment>
  )
}

export default Home