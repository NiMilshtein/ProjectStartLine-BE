const express= require("express");
const cors = require("cors");
const pixabayRoute = require("./routes/pixabayRoute");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('images'));

app.use("/api/pixabay", pixabayRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000")
});