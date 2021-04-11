import express from "express";
import amqp from "amqplib";

const rabbitmqConnection = "amqp://localhost";
const reservationQueue = "reservations";

export async function reserveRoom(req: express.Request, res: express.Response, next: express.NextFunction) {

    //params
    const reservationDetails = req.body as { hotelId: string, roomNumber: number, email: string }

    const msgJSON = { hotelId: reservationDetails.hotelId, roomNumber: reservationDetails.roomNumber, email: reservationDetails.email };
    const msg = JSON.stringify(msgJSON);

    try {
        const connection = await amqp.connect(rabbitmqConnection);
        const channel = await connection.createChannel();

        await channel.assertQueue(reservationQueue, {
            durable: false,
        });

        channel.sendToQueue(reservationQueue, Buffer.from(msg));
        console.log(`[x] Sent ${msg}`);

        res.status(200).send(`Reservation request has been forwarded succesfully`);

        setTimeout(async () => {
            await connection.close();
        }, 500
        );

    } catch (error) {
        console.log(error);
        res.status(400).send(`Reservation was unable to be forwarded - Try again later`);
    }
}