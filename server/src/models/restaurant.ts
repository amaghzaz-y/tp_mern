import { model, Schema } from "mongoose"

export interface IRestaurant {
    code: number,
    EmailAddress: string,
    name: string,
    type: string
    website: string
    street: string
    number: string
    city: string
    zip: string
    country: string
    phone: string
    date: Date
    payment: string
    description: string
    scoring: IScore[]
}

export interface IScore {
    comment: string
    score: number
}


const restaurantSchema = new Schema<IRestaurant>({
    code: { type: Number, required: true, unique: true },
    phone: { type: String, required: true },
    scoring: {
        comment: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    date: Date,
    city: String,
    country: String,
    description: String,
    EmailAddress: String,
    name: String,
    number: String,
    payment: String,
    street: String,
    type: String,
    website: String,
    zip: String
});

export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema, "Restaurant_YA")