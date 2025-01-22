import express from "express"
import {
    createRestaurant,
    deleteRestaurant, getRestaurantByCode, getRestaurants, updateRestaurant
} from "../controllers/restaurant.controller"

const restaurantApi = express()

restaurantApi.get("/api/restaurant/all", getRestaurants)

restaurantApi.get("/api/restaurant/id/:id", getRestaurantByCode)

restaurantApi.post("/api/restaurant", createRestaurant)

restaurantApi.put("/api/restaurant/id/:id", updateRestaurant)

restaurantApi.delete("/api/restaurant/id/:id", deleteRestaurant)

export default restaurantApi