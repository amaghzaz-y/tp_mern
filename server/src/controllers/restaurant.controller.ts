import { Restaurant } from "../models/restaurant";
import Express from 'express';

export async function getRestaurants(_: Express.Request, res: Express.Response) {
    const results = await Restaurant.find({}).limit(5).sort({ code: -1 })
    res.json(results)
}

export async function getRestaurantByCode(req: Express.Request, res: Express.Response) {
    const { id } = req.params
    const restaurant = await Restaurant.findOne({ code: +id })
    res.json(restaurant)
}

export async function createRestaurant(req: Express.Request, res: Express.Response) {
    const restaurant = await Restaurant.create(req.body)
    res.json(restaurant)
}

export async function updateRestaurant(req: Express.Request, res: Express.Response) {
    const { id } = req.params
    let restaurant = await Restaurant.findOneAndUpdate({ code: +id }, req.body)
    restaurant = await Restaurant.findOne({ code: +id })
    res.json(restaurant)
}

export async function deleteRestaurant(req: Express.Request, res: Express.Response) {
    const { id } = req.params
    const restaurant = await Restaurant.deleteOne({ code: +id })
    res.json(restaurant)
}
