import React from 'react'
import { Link } from 'react-router-dom';
// import ReactStars from 'react-rating-stars-component'
import { Rating } from '@mui/material';

const ProductCard = ({product}) => {
const options={
    readOnly:true,
    precision:0.5,
    value:product.rating,
    size:"small"
}

  return (
     <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...options} /><span className="productCardSpan">{product.numOfReviews} Reviews</span>
        </div>
        <span>{`Rs.${product.price}`}</span>
     </Link>
  )
}

export default ProductCard