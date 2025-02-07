import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import { Request, Response } from "express";
import DashboardService from "./service";

const getData = async (req: Request, res: Response) => {
	try {
		const result = await DashboardService.getChildrenCount();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {},
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

const getChildrenById = async (req: Request, res: Response) => {
	try {
		const result = await DashboardService.getChildrenCount();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				// children: result.children,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"edit",
				"edit children",
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

export { getData, getChildrenById };
