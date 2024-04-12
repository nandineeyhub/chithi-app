const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cors = require('cors');
const errorHandler = require("./Middleware/errorMiddleware")
const path = require("path")
const app = express()

app.use(cors());
app.use(express.json()) //to parse the data posted; the data will be recieved in req.body
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 8000

app.use("/api/users", require("./Routes/UserRoutes") )
// app.use(errorHandler)
app.use("/images", express.static(path.join(__dirname, 'backend/uploads')))

connectDB()

app.listen(PORT, ()=>{console.log(`Server Started`)})
 