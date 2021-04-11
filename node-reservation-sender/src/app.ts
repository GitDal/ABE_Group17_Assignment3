import dotenv from "dotenv";
dotenv.config(); //Has to be called before any other imports
import express from "express";
import http from "http";
import hotelRouter from "./routes/hotel";

const app = express();
app.use(express.json());
app.use('/hotel', hotelRouter);

var port = 3000;
const server = http.createServer(app);

main();

async function main() {
    server.listen(port);
}