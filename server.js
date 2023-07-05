const express= require("express")
const cors= require("cors");
const pixabayRoute = require("./routes/pixabayRoute");
const app = express();
require("dotenv").config()
app.use(express.json())
app.use(express.static('images'))
app.use(cors());
app.use("/api/pixabay", pixabayRoute);
// app.use("*",(req,res)=>{
    const router = express.Router();
//     res.status(418).send({message: "oops page not found"})
// })

app.listen(process.env.PORT||3000,()=>{
    console.log("server is running on port 3000")
})