import { NextFunction, Request, Response } from "express";

const validateKelas = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { nama } = req.body;

		if (!nama) {
			throw new Error("Name fields are required");
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

export default validateKelas;
