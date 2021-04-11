import express from "express";
import * as hotelController from "../controllers/hotelController";

const router = express.Router();

router.route('/:hotelId/room/:roomNumber')
    .get(hotelController.getRoom)
    .put(hotelController.reserveRoom);

export default router;