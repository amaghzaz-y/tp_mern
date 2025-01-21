import express from "express"
import { getRestaurantByCode, getRestaurants, upsertRestaurant } from "../controllers/restaurant.controller"

const restaurantApi = express()

restaurantApi.get("/api/all", async (req, res) => {
    const restaurants = await getRestaurants(5)
    res.json(restaurants)
})

restaurantApi.get("/api/by/:id", async (req, res) => {
    const { id } = req.params
    const restaurant = await getRestaurantByCode(+id)
    res.json(restaurant)
})

restaurantApi.put("/api/by/:id", async (req, res) => {
    const { id } = req.params
    const restaurant = await upsertRestaurant(+id, req.body)
    res.json(restaurant)
})

export default restaurantApi