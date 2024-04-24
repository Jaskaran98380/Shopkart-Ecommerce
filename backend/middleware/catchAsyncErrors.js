module.exports = (theFunc)=>(req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next)
}


// module.exports = (theFunc)=>{return (req,res,next)=>{             //same thing as above..You have to write return keyword with {} and does not required in the above case as it is implicitly done.
//     Promise.resolve(theFunc(req,res,next)).catch(next)
// }}