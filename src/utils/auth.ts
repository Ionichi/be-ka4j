import { Response } from "express";
import jwt from "jsonwebtoken";

class Authentication {
	static generateToken = (username: string) => {
		const secret = process.env.AUTH_SECRET_KEY as string;
		const token = jwt.sign({ username }, secret, {
			algorithm: "HS256",
			expiresIn: "1h",
		});

		return token;
	};

	static setCookie = (res: Response, username: string) => {
		const token = Authentication.generateToken(username);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 1000,
		});
	};
}

export default Authentication;
