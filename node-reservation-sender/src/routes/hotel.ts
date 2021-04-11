import express from "express";
import * as hotelController from "../controllers/hotelController";

const router = express.Router();

router.route('/reserveroom').post(hotelController.reserveRoom);

export default router;