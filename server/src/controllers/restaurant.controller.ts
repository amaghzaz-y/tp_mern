import { Restaurant, type IRestaurant } from "../models/restaurant";

export async function getRestaurants(limit: number = 5) {
    return Restaurant.find({}).limit(limit).sort({ code: -1 }).exec()
}

export async function getRestaurantByCode(code: number) {
    return Restaurant.findOne({ code }).exec()
}

export async function upsertRestaurant(code: number, data: IRestaurant) {
    return Restaurant.findOneAndUpdate({ code }, data, { new: true }).exec()
}

export async function deleteRestaurant(code: number) {
    return Restaurant.deleteOne({ code }).exec()
}