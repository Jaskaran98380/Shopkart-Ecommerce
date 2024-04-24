const app = require("./app")
const dotenv=require("dotenv")
const connectDatabase = require('./config/database')
const cloudinary = require('cloudinary');

//handling uncaught exception
//uncaughtException means if you console.log something in between which is not defined!

process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shuting down the server due to uncaughtException");
    process.exit(1);
})

dotenv.config({path:"backend/config/config.env"})

connectDatabase()
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
// console.log(yt);

process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shuting down the server due to unhandled Promise rejection");

    server.close(()=>{
        process.exit(1);
    });
})

//unhandled promise rejection is like when you type mongo instead of mongodb in url string(DB_URI)