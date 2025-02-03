import { SimpleAbsensiChildrenDTO } from "domain/absensi-children/dto";
import { NextFunction, Request, Response } from "express";

const validateAbsensiChildren = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { tgl, data } = req.body;

		const checkFormatData: SimpleAbsensiChildrenDTO[] = data;

		if (!tgl || !checkFormatData.length) {
			throw new Error("Date & attendance data are required");
		}

		next();
	} catch (error) {
		if (error instanceof Error) {
			res.status(422).json({
				success: false,
				message: error.message,
			});
		}
	}
};

export default validateAbsensiChildren;
