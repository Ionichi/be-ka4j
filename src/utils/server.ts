import cookieParser from "cookie-parser";
import express, { json } from "express";
import router from "routes/index.routes";
import cors from "cors";

const server = express();

server.use(json());
server.use(cors({ origin: process.env.FRONTEND_BASE_URL, credentials: true }));
server.use(cookieParser());
server.use("/api/v1", router);

export default server;
