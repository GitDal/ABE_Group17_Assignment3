import dotenv from "dotenv";
dotenv.config(); //Has to be called before any other imports

import connect from "./database/db";
import handleReservation from "./handlers/reservationHandler";
import receiver from "./queue/receive";

main();

async function main() {
    await connect();
    await receiver("reservations", handleReservation);
}