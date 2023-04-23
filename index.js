const { Console } = require("console");
const app = require("./app");
const connectDatabase= require("./config/database")
const cors = require("cors")
const dotenv=require("dotenv")
console.log(process.env.PORT)
const cloudinary=require("cloudinary");

//handling uncaught exception
process.on("ReferenceError",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaught exception`);
    process.exit(1);
});

//config
    dotenv.config({path:"config/config.env"});


// const productRoute = require("../backend/routes/productRoute")
//connecting to database 

app.use(express.static(path.join(__dirname,"./build")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./build/index.html"));
})


connectDatabase();

cloudinary.config({

    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server =app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
}) 

// console.log(youtube);

//unhandled promise rejection
// process.on("unhandledRejection",(err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to unhandled promise rejection`);

//     server.close(()=>{
//         process.exit(1);
//     });

// });

