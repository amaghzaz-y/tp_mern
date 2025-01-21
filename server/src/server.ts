import { connect } from 'mongoose'
import 'dotenv/config'
import { Restaurant } from './models/restaurant'
import morgan from "morgan"
import express from "express"
import restaurantApi from './routes/restaurant.route'


const url = process.env["MONGODB_URL"]!

const app = express()
app.use(restaurantApi)
app.use(express.json())
app.use(morgan(':id :method :url :response-time'))

app.listen(3000, async () => {
    await connect(url)
    console.log("Listening on port 3000")
})  