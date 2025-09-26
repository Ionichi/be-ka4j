import { NextFunction, Request, Response } from "express";

const validateSeason = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { tgl } = req.body;

		if (!tgl) {
			throw new Error("Date field are required");
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

export default validateSeason;
