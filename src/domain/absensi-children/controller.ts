import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import { Request, Response } from "express";
import AbsensiChildrenService from "./service";

const getAbsensiChildren = async (req: Request, res: Response) => {
	try {
		const tgl = req.query.tgl as string;
		const kelasId = req.query.kelasId as string;
		const result = await AbsensiChildrenService.getAbsensiChildren(
			tgl,
			kelasId
		);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				absensiChildren: result.absensiChildren,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get children's attendance",
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

const storeAbsensiChildren = async (req: Request, res: Response) => {
	try {
		const { tgl, data, currentUsername } = req.body;

		const result = await AbsensiChildrenService.storeAbsensiChildren(
			tgl,
			currentUsername,
			data
		);

		await LogService.createLog(
			"save",
			"save children's attendance",
			`save children's attendance ${tgl}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: {
				absensiChildren: result.absensiChildren,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"save",
				`save children's attendance ${req.body.tgl}`,
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

export { getAbsensiChildren, storeAbsensiChildren };
