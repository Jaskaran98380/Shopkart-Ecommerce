const mongoose = require('mongoose')



const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
        // useCreateIndex:true
    }).then((data)=>{
        console.log(`Mongodb connected on server ${data.connection.host}`)
    })
    // .catch((error)=>{
    //     console.log(error)
    // })
}

module.exports = connectDatabase