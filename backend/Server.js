const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cors = require('cors');
const errorHandler = require("./Middleware/errorMiddleware")
const app = express()
const path = require("path")

app.use(cors());
app.use(express.json()) //to parse the data posted; the data will be recieved in req.body
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 8000

app.use("/api/users", require("./Routes/UserRoutes"))
// app.use(errorHandler)
app.use(express.static(path.join(__dirname, `uploads`)))
connectDB()

app.listen(PORT, ()=>{console.log(`Server Started`)})
 