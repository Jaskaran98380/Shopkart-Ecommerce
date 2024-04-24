import React, { Fragment, useEffect , useState} from 'react'
import "./productDetails.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, productDetails } from "../../actions/productAction"
import Carousel from "react-material-ui-carousel"
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import Loader from "../layout/Loader/Loader";
import ReviewCard from "./ReviewCard"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData"
import {addItemsToCart} from "../../actions/cartAction"
import {Typography} from '@mui/material'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
  } from "@mui/material";
  import { Rating } from '@mui/material';
  import { NEW_REVIEW_RESET } from "../../constants/productConstants";
  import { newReview } from '../../actions/productAction'

const ProductDetails = () => {
 

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productDetails)
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
      );
    const { id } = useParams();
    // useEffect(() => {
    //     // window.scrollTo(0, 0);
    //     if(error){
    //         return alert.error(error);
    //         // alert.error(error);
    //         // dispatch(clearErrors());
    //     }
    //     console.log(id);
    //     dispatch(productDetails(id))
    // }, [dispatch, id , error , alert])

    // const options={
    //     edit:false,
    //     activeColor:"tomato",
    //     color:"grey",
    //     isHalf:true,
    //     size:window.innerWidth < 600 ? 15 : 25,
    //     value:product.rating,
    // }
    const options={
        precision:0.5,
        size:"large",
        value:product.rating,
        readOnly:true
    }
    const [quantity , setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
    const increaseQuantity = ()=>{
         if(product.Stock <=quantity)return;
         setQuantity(quantity + 1);
    }
    const decreaseQuantity = ()=>{
        if(1 >=quantity)return;
         setQuantity(quantity - 1);
    }

    const addToCartHandler = (e)=>{
        e.preventDefault();
        dispatch(addItemsToCart(id , quantity));
        alert.success("Added to Cart");
    }
    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };

      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

      useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (reviewError) {
          alert.error(reviewError);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Review Submitted Successfully");
          dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(productDetails(id));
      }, [dispatch, id, error, alert, reviewError, success]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ):(
                <Fragment>
            <MetaData title={`${product.name} --SHOPKART`} />
            <div className="productDetails">
                <div className="test">
                    <div className="inner">
                    <Carousel>
                        {product.images && product.images.map((item, i) => (
                            <img src={item.url} key={item.url} className="carouselImage" alt={`${i} Slide`} />
                        ))}
                    </Carousel>
                    </div>
                    
                </div>
                <div className="productBlock">
                    <div className="productBlock-1">
                        <h1>{product.name}</h1>
                    </div>
                    <div className="productBlock-2"> 
                        {/* <ReactStars {...options} /><span className="productCardSpan">({product.numOfReviews} Reviews)</span> */}
                        <Rating {...options} /><span className="productCardSpan">({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="productBlock-3"> 
                            <h2>{`Rs.${product.price}`}</h2>
                            <div className="productBlock-3-1">
                                <button className="red" onClick={decreaseQuantity}>-</button>
                                <input value={quantity} type="number" />
                                <button className="green" onClick={increaseQuantity}>+</button>
                                <div className="productBlock-3-1-1">
                                    <p>Status:</p>
                                        <span className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            <b>{product.Stock < 1 ? "OutOfStock" : "InStock"}</b>
                                        </span>
                                        
                                    
                                </div>
                            </div>
                    </div>
                    <div className="productBlock-4">
                       
                            <button disabled={product.Stock<1?true:false} onClick={addToCartHandler}>
                            <h1>Add to Cart</h1>
                            </button>
                       
                    </div>
                    <div className="productBlock-5">
                       <Typography>Description:</Typography>
                       <p>{product.description}</p>
                       <button onClick={submitReviewToggle}>Submit Review</button>
                    </div>
                </div>

            </div>
            
        
            <h1 className="reviewHeading">Reviews</h1>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

            {product.reviews && product.reviews[0] ? (
                <div>
                     {product.reviews && product.reviews.map((rev)=>(
                    <ReviewCard review={rev} />
                ))}
                </div>
            ):(
                <h2 className="noReviews">No Reviews yet.</h2>
            )}
            </Fragment>
            )}
        </Fragment>

    )
}

export default ProductDetails