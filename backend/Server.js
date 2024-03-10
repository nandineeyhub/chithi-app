const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json()) //to parse the data posted; the data will be recieved in req.body

const PORT = process.env.PORT || 5000

app.use("/api/users", require("./Routes/UserRoutes") )

connectDB()

app.listen(PORT, ()=>{console.log(`Server Started`)})
 