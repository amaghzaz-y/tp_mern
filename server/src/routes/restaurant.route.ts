import express from "express"
import {
    createRestaurant,
    deleteRestaurant, getRestaurantByCode, getRestaurants, updateRestaurant
} from "../controllers/restaurant.controller"

const restaurantApi = express()

restaurantApi.get("/api/restaurant/all", async (req, res) => {
    const restaurants = await getRestaurants(5)
    res.json(restaurants)
})

restaurantApi.get("/api/restaurant/id/:id", async (req, res) => {
    const { id } = req.params
    const restaurant = await getRestaurantByCode(+id)
    res.json(restaurant)
})

restaurantApi.post("/api/restaurant", async (req, res) => {
    const restaurant = await createRestaurant(req.body)
    res.json(restaurant)
})

restaurantApi.put("/api/restaurant/id/:id", async (req, res) => {
    const { id } = req.params
    const restaurant = await updateRestaurant(+id, req.body)
    res.json(restaurant)
})

restaurantApi.delete("/api/restaurant/id/:id", async (req, res) => {
    const { id } = req.params
    const restaurant = await deleteRestaurant(+id)
    res.json(restaurant)
})

export default restaurantApi