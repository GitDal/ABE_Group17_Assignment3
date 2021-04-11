import mongoose from "mongoose";

const Schema = mongoose.Schema;
const hotelModelName = "Hotel";

export interface IRoom {
    number: number;
    size: number;
    available: boolean;
    beds: number;
    balcony: boolean;
    reservedByUserId?: string; // user.Email
}

export interface IHotel {
    hotelManagerId: String; // user.Email
    name: string;
    address: string;
    rooms: Array<IRoom>
}

const roomSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    size: Number,
    available: {
        type: Boolean,
        'default': true,
    },
    beds: Number,
    balcony: Boolean,
    reservedByUserId: String // user.Email
});

const hotelSchema = new Schema({
    hotelManagerId: String,
    name: String,
    address: String,
    rooms: [roomSchema]
});

export default mongoose.model(hotelModelName, hotelSchema);