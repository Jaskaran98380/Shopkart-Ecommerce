const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary')

exports.getAllProducts = catchAsyncErrors(async(req,res,next)=>{
    // return next(new ErrorHander("Testing error" , 500));
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    // const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    // const products = await apiFeature.query;
    // const filteredProducts = products.length;

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProducts = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();

    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProducts
    })
})

exports.getAdminProducts = catchAsyncErrors(async(req,res,next)=>{
   const products = await Product.find();

    res.status(200).json({
        success:true,
        products,
    })
})

exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Products",
        width: 150,
        crop: "scale",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user._id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        // res.status(404).json({
        //     success:false,
        //     message:"Product not found"
        // })

        return next(new ErrorHander("Product not found" , 404));
    }

     // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
        width: 150,
        crop: "scale",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        product
    })
})

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    // let product = await Product.findById(req.params.id);
    // if(!product){
    //     res.status(404).json({
    //         success:false,
    //         message:"Product not found"
    //     })
    // }
    // await product.deleteOne();
    // res.status(200).json({
    //     success:true,
    //     message:"Product Deleted Successfully"
    // })

      let product = await Product.findById(req.params.id);
    if(!product){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
     // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

     product = await Product.deleteOne({_id : req.params.id});
    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
});

exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    // return next(new ErrorHander("Testing error" , 500));
    let product = await Product.findById(req.params.id);
    if(!product){
        // res.status(404).json({
        //     success:false,
        //     message:"Product not found"
        // })

        return next(new ErrorHander("Product not found" , 404));
    }
    res.status(200).json({
        success:true,
        product
    })
})

exports.productReview = catchAsyncErrors(async(req,res,next)=>{
    const {productId ,rating , comment} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    console.log(product,"yes");

    const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

    //  const isReviewed=product.reviews.forEach((rev)=>rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating=rating,
                rev.comment=comment
            }
        })
    }
    else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg=0;
    product.reviews.forEach((rev)=>{
        avg+=rev.rating;
    })

    product.rating = avg/product.numOfReviews
    await product.save();
    console.log(product,"no");
    res.status(200).json({
        success:true
    })
})

//Get product reviews
exports.getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHander("Product not found" , 404));
    }
    res.status(200).json({
        status:true,
        reviews:product.reviews
    })
})

//delete review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHander("Product not found" , 404));
    }

    // product.reviews = product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
    
    // let avg=0;
    // product.reviews.forEach((rev)=>{
    //     avg+=rev.rating;
    // })
    // product.numOfReviews = product.reviews.length;

    // product.rating = avg/product.numOfReviews;
    // await product.save();
    // res.status(200).json({
    //     success:true
    // })

    let reviews = product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());
    
    let avg=0;
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })
    const numOfReviews = reviews.length;
    let rating = 0;
  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / numOfReviews;
  }

    await Product.findByIdAndUpdate(req.query.productId, 
        {
            reviews , rating , numOfReviews
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false
        }
    )
    res.status(200).json({
        success:true
    })


})
