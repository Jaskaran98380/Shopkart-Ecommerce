const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        description: "for amazon-clone project",
        shipping: {
          name: "mummy",
          address: {
            line1: "B-58, Vishnu Garden Part-1, Top floor",
            postal_code: "110018",
            city: "New Delhi",
            state: "KA",
            country: "IN",
          }},
        metadata:{
            company:"Shopkart"
        }
    })

    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    })
})

exports.sendStripeApiKey = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})