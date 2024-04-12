const express = require("express")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")
const cors = require('cors');
const errorHandler = require("./Middleware/errorMiddleware")
const path = require("path")
const app = express()
const path = require("path")

app.use(cors());
app.use(express.json()) //to parse the data posted; the data will be recieved in req.body
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 8000

app.use("/api/users", require("./Routes/UserRoutes") )
// app.use(errorHandler)
<<<<<<< HEAD
app.use("/images", express.static(path.join(__dirname, 'backend/uploads')))
=======
app.use(express.static(path.join(__dirname, `backend/uploads`)))
>>>>>>> 4f5c42a766cf150e6a1e39955ecf341a32647f48

connectDB()

app.listen(PORT, ()=>{console.log(`Server Started`)})
 