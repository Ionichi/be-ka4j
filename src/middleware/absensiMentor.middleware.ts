import { SimpleAbsensiMentorDTO } from "domain/absensi-mentor/dto";
import { NextFunction, Request, Response } from "express";

const validateAbsensiMentor = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { tgl, data } = req.body;

		const checkFormatData: SimpleAbsensiMentorDTO[] = data;

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

export default validateAbsensiMentor;
