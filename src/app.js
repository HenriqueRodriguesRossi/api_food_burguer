const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
//require("./database/connect")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const RequestRouter = require("./routes/RequestsRouter")
app.use(RequestRouter)

const RestaurantRouter = require("./routes/RestaurantRouter")
app.use(RestaurantRouter)

const UserRouter = require("./routes/UserRouter")
app.use(UserRouter)

const DishesRouter = require("./routes/DishesRouter")
app.use(DishesRouter)

app.listen(3000, ()=>{
    console.log("Servidor rodando!")
})