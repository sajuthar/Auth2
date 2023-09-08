require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");


//database conection
connection();

app.use(express.json())
app.use(cors());

//routes
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server Listening on port ${port}...`)
})
