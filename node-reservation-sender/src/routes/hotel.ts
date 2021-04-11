import express from "express";
import * as hotelController from "../controllers/hotelController";

const router = express.Router();

// router.route('/:hotelId/room/:roomNumber')
//     .get(authorize([claims.USER]), hotelController.getRoom)
//     .put(authorize([claims.USER]), hotelController.reserveRoom);
router.route('/:hotelId/room/:roomNumber')
    .get(hotelController.getRoom)
    .put(hotelController.reserveRoom);

export default router;