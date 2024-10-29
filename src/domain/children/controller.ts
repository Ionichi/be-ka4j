import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import { Request, Response } from "express";
import ChildrenService from "./service";

const getChildren = async (req: Request, res: Response) => {
	try {
		const result = await ChildrenService.getChildren();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				children: result.children,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get children",
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

const createChildren = async (req: Request, res: Response) => {
	try {
		const { nama, tglLahir, namaParent, kontak, isJemaat, kelasId } =
			req.body;

		const result = await ChildrenService.createChildren(
			nama,
			tglLahir,
			namaParent,
			kontak,
			isJemaat,
			kelasId
		);

		await LogService.createLog(
			"save",
			"create children",
			`create children ${nama}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: {
				children: result.children,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"save",
				"create children",
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

export { getChildren, createChildren };
