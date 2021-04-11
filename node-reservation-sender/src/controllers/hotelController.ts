import express from "express";
import { IHotel, IRoom } from "../models/hotel";

// GET /{hotelId}/room/{roomNumber}
export async function getRoom(req: express.Request, res: express.Response, next: express.NextFunction) {

    // params
    const hotelId = req.params.hotelId;
    const roomNumber = req.params.roomNumber;

    console.log(hotelId);
    console.log(roomNumber);

    // try {
    //     let result = await hotelModel.findOne({ _id: hotelId }, { "rooms": { $elemMatch: { "roomNumber": roomNumber } } });

    //     let roomResult = result?.toObject() as IHotel;
    //     if (!roomResult) {
    //         res.status(404).send(`The hotel with id=${hotelId} doesn't exist`);
    //     }

    //     let room = roomResult.rooms[0];
    //     if (!room) {
    //         res.status(404).send(`The room with roomNumber=${roomNumber} doesn't exist`);
    //     }

    //     res.status(200).send(room);
    // } catch (error) {
    //     printError("getRoom", error);
    //     res.status(400).send(error.message);
    // }
}

// PUT {hotelId}/room/{roomNumber}
export async function reserveRoom(req: express.Request, res: express.Response, next: express.NextFunction) {

    //params
    const hotelId = req.params.hotelId;
    const roomNumber = req.params.roomNumber;

    // userId via webToken
    // const user = req.user as { email: string };
    // const reservedByUserId = user.email;

    console.log(hotelId);
    console.log(roomNumber);
    // console.log(user);

    // try {
    //     let result = await hotelModel.updateOne(
    //         { _id: hotelId, "rooms": { $elemMatch: { "roomNumber": roomNumber, "available": true } } },
    //         { $set: { "rooms.$.available": false, "rooms.$.reservedByUserId": reservedByUserId } });

    //     if (result.nModified === 0) {
    //         res.status(500).send(`Room with roomNumber=${roomNumber} couldn't be reserved (maybe its already reserved)`)
    //     } else {
    //         res.status(200).send(`Reserved room with roomNumber ${roomNumber}!`);
    //     }

    // } catch (error) {
    //     printError("reserveRoom", error);
    //     res.status(400).send(error.message);
    // }
}

function printError(functionName: string, error: any) {
    console.log(`** Error from function ${functionName}:`);
    console.log(error);
}