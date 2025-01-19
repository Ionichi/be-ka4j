import { NextFunction, Request, Response } from "express";

const validateLogin = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			throw new Error("Username and password fields are required");
		}
		if (password.length < 6) {
			throw new Error("Password must be at least 6 characters long");
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

export default validateLogin;
