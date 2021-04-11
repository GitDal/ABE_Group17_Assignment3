import { ConsumeMessage } from "amqplib";
import hotelModel, { IHotel } from "../database/models/hotel";
import sender from "../queue/send";

async function handleReservation(msg: ConsumeMessage | null) {
    if (msg == null) {
        console.log(`handleReservation: Received null message!`);
    } else {
        const reservationRequest: { hotelId: string, roomNumber: number, email: string } = JSON.parse(msg.content.toString());

        // Unpack reservation request.
        const hotelId = reservationRequest.hotelId;
        const roomNumber = reservationRequest.roomNumber;
        const email = reservationRequest.email;

        console.log(hotelId);
        console.log(roomNumber);
        console.log(email);
        // Attempt reservation in database.
        try {
            const hotel: IHotel = await hotelModel.findById({_id: hotelId});
            
            const result = await hotelModel.updateOne(
                { _id: hotelId, "rooms": { $elemMatch: { "number": roomNumber, "available": true } } },
                { $set: { "rooms.$.available": false, "rooms.$.reservedByUserId": email } });

            if (result.nModified === 0) {
                // Reservation unsuccesful - add non-confirm to confirm queue?
                console.log(`handleReservation: Reservation unsuccesful!`);
                const msgJSON = {hotelName: hotel.name, hotelId: hotelId, roomNumber: roomNumber, email: email, successfullyReserved: false};
                sender("confirms", JSON.stringify(msgJSON));
            } else {


                // Reservation succesful - add confirm to confirm queue?
                console.log(`handleReservation: Reservation succesful!`);
                const msgJSON = {hotelName: hotel.name, hotelId: hotelId, roomNumber: roomNumber, email: email, successfullyReserved: true};

                sender("confirms", JSON.stringify(msgJSON));
            }

        } catch (error) {
            // Internal error 
            console.log(`handleReservation: Error!`);
        }
    }
}

export default handleReservation;