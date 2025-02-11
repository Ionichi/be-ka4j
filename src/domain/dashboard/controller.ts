import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import { Request, Response } from "express";
import DashboardService from "./service";

const getDataDashboard = async (req: Request, res: Response) => {
	try {
		const result = await DashboardService.getDataDashboard();

		res.status(200).json({
			success: true,
			message: result.message,
			data: result.dataCount,
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get data dashboard",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

export default getDataDashboard;
