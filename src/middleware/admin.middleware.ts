import UserService from "domain/user/service";
import { Request, Response, NextFunction } from "express";

const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { currentUsername } = req.body;
		const user = await UserService.getUserByUsername(currentUsername);
		if (!user || !user.isAdmin) {
			throw new Error("You are not authorized to perform this action");
		}

		next();
	} catch (error) {
		if (error instanceof Error) {
			res.status(403).json({
				success: false,
				message: error.message,
			});
		}
	}
};

export default isAdmin;
