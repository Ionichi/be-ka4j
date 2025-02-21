import { Request, Response } from "express";
import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import SeasonService from "./service";

const getSeason = async (req: Request, res: Response) => {
	try {
		const result = await SeasonService.getSeason();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				season: result.season,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get season history",
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

const getLatestSeason = async (req: Request, res: Response) => {
	try {
		const result = await SeasonService.getLatestSeason();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				season: result.season,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get latest season",
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

const createSeason = async (req: Request, res: Response) => {
	try {
		const { tgl, currentUsername } = req.body;
		const result = await SeasonService.createSeason(tgl, currentUsername);

		await LogService.createLog(
			"save",
			"create season",
			`create season ${tgl}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: {
				season: result.season,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"save",
				"create season",
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

const deleteSeason = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await SeasonService.deleteSeason(id);

		await LogService.createLog(
			"delete",
			"delete season",
			`delete season ${result.season.tgl}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				season: result.season,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"delete",
				"delete kelas",
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

export { getSeason, getLatestSeason, createSeason, deleteSeason };
