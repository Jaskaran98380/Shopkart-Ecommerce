import React,{useEffect , Fragment, useState} from 'react'
import {useSelector , useDispatch} from "react-redux"
import {clearErrors, getProduct} from "../../actions/productAction"
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert"
import ProductCard from "../Home/ProductCard.js"
import "./products.css"
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination"
import Slider from "@mui/material/Slider"
import Typography from '@mui/material/Typography';
import MetaData from "../layout/MetaData"

const Products = () => {
  const categories=[
    'Fruits',
    'machine3',
    'SuperMachine',
    'SuperMachine2'
  ];
  const [currentPage , setCurrentPage] = useState(1);
  const [price , setPrice] = useState([0,250000]);
  const [category , setCategory]=useState("");
  const [rating , setRating] = useState(0);

  const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
    console.log(e);
    console.log(currentPage);
  }
  const priceHandler = (event , newPrice)=>{
    setPrice(newPrice);
  }
  console.log("outer" + currentPage);
    const alert = useAlert();
const dispatch = useDispatch();
const { keyword } = useParams();
const { loading, error, products , productsCount , resultPerPage  , filteredProducts} = useSelector((state) => state.products);

useEffect(()=>{
  if(error){
    return alert.error(error);
  }
    dispatch(getProduct(keyword , currentPage , price , category , rating))
},[dispatch , keyword , currentPage , price , category , rating , alert , error]);

let count=filteredProducts;
return ( 
    <Fragment>
      {loading ? (
        <Loader />
  ):(
        <Fragment>
          <MetaData title="PRODUCTS --SHOPKART" />
            <div className="products">
                {products &&
                  products.map((product) => (
                    <ProductCard  key={product._id} product={product} />
                  ))}
            </div>
            <div className="filterBox">
            <Typography>Price</Typography>
            <Slider 
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            // valueLabelDisplay="on"
            aria-labelledby="range-slider"
            min={0}
            max={250000} />
            <Typography className="cat">
              Categories
            </Typography>
            <ul className="categoryBox">
              {categories.map((category)=>(
                <li className="categoryLink"
                onClick={()=>setCategory(category)}
                key={category}>{category}</li>
              ))}
            </ul>
            <fieldset className='rate'>
              <Typography component="legend">Ratings above:</Typography>
              <Slider value={rating}
              aria-labelledby='continuous-slider'
              valueLabelDisplay="auto"
              onChange={(e,newRating)=>setRating(newRating)}
              min={0}
              max={5} />
            </fieldset>
          </div>
            
            {resultPerPage < count && (
                   <div className="paginationBox">
                   <Pagination
                   activePage={currentPage}
                   itemsCountPerPage={resultPerPage}
                   totalItemsCount={count}
                   onChange={setCurrentPageNo}
                   nextPageText="Next"
                   prevPageText="Prev"
                   firstPageText="1"
                   lastPageText="Last"
                   itemClass="page-item"
                   linkClass="page-link"
                   activeClass="pageItemActive"
                   activeLinkClass="pageLinkActive">
                   </Pagination>
                 </div>
            )}
         
            </Fragment>
      )}
    </Fragment>
  )
}

export default Products