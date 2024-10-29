import { NextFunction, Request, Response } from "express";

const validateChildren = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { nama, gender, kelasId } = req.body;

		if (!nama || !gender || !kelasId) {
			throw new Error("Name, gender & class field are required");
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

export default validateChildren;
