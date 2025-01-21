import { connect } from 'mongoose'
import 'dotenv/config'
import { Restaurant } from './models/restaurant'

const url = process.env["MONGODB_URL"]!

connect(url).then(async (_) => {
    const res = await Restaurant.findOne().findOne().exec()
    console.log(res)
})