import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	try {
		const secret = process.env.AUTH_SECRET_KEY as string;
		const { token } = req.cookies;

		const authenticated = jwt.verify(token, secret) as JwtPayload;
		req.body.username = authenticated.username;

		next();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			if (error.message === "jwt expired") {
				res.status(401).json({
					success: false,
					message: "Token has expired.",
				});
			}
			res.status(401).json({
				success: false,
				message: error.message.replaceAll("jwt", "Token"),
			});
		}
	}
};

export default isAuthenticated;
