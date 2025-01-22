import { Restaurant } from "../models/restaurant";
import Express from 'express';

export async function getRestaurants(req: Express.Request, res: Express.Response) {
    let { limit } = req.query
    // @ts-ignore
    if (!limit) limit = 5
    // @ts-ignore
    const results = await Restaurant.find({}).limit(+limit).sort({ code: -1 })
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
