import cookieParser from "cookie-parser";
import express, { json } from "express";
import router from "routes/index.routes";

const server = express();

server.use(json());
server.use(cookieParser());
server.use("/api/v1", router);

export default server;
