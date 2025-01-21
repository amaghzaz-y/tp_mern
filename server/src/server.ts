import { connect } from 'mongoose'
import 'dotenv/config'
import morgan from "morgan"
import express from "express"
import restaurantApi from './routes/restaurant.route'
import cors from "cors"

const url = process.env["MONGODB_URL"]!

const app = express()
app.use(morgan(':method :url :response-time'))
app.use(cors({ origin: "*`" }))
app.use(express.json())
app.use(restaurantApi)

app.listen(3000, async () => {
    await connect(url)
    console.log("Listening on port 3000")
})  