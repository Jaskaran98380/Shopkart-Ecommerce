const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorHander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

exports.placeNewOrder = catchAsyncErrors(async(req,res,next)=>{
    const {shippingInfo , paymentInfo , totalPrice , taxPrice , shippingPrice , itemsPrice , orderItems} = req.body;
    
    const order = await Order.create({
        shippingInfo,paymentInfo , totalPrice , taxPrice , shippingPrice , itemsPrice , orderItems,
        user:req.user._id,
        paidAt:Date.now()
    })
    res.status(201).json({
        success:true,
        order
    })
})

exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findOne({_id:req.params.id}).populate("user" , "name email");         //populate will go to user field and using id of user will go to user db and select name and email of the user.
    if(!order){
        return next(new ErrorHander("Order not found" , 404));
    }

    res.status(200).json({
        success:true,
        order
    })
})


exports.myOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});         //populate will go to user field and using id of user will go to user db and select name and email of the user.
    if(!orders){
        return next(new ErrorHander("No orders yet" , 404));
    }

    res.status(200).json({
        success:true,
        orders
    })
})

//Get all orders--admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order)=>totalAmount+=order.totalPrice);

    res.status(200).json({
        success:true,
        totalAmount,
        orders
    })
})

//Update an order status--admin
exports.updateOrderStatus = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander("No order with this id" , 404));
    }
    console.log(order);


    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("product has already been delivered" , 400));
    }
    console.log(req.body.status);
    if(req.body.status==="Shipped"){
        order.orderItems.forEach(async(ord)=>{
            await updateStock(ord.product , ord.quantity);
        });
    } 

    order.orderStatus = req.body.status;
    await order.save({validateBeforeSave:false});

    if(order.orderStatus === "Delivered"){
        order.deliveredAt = Date.now();
    }
    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        order
    })
})

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.Stock-=quantity;
    await product.save();
}

exports.deleteOrder = catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHander("No order with this id" , 404));
    }
    await Order.deleteOne({_id : req.params.id});
    res.status(200).json({
        success:true,
        message:"Order Deleted Successfully",
        order
    })
    
})

