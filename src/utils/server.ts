import cookieParser from "cookie-parser";
import express, { json, Request, Response } from "express";
import router from "routes/index.routes";
import cors from "cors";

const server = express();

server.use(json());
server.use(cors({ origin: process.env.FRONTEND_BASE_URL, credentials: true }));
server.use(cookieParser());
server.use("/api/v1", router);
server.get("/", (req: Request, res: Response) => {
	res.json({
		status: true,
		message: "Server is running",
	});
});

export default server;
