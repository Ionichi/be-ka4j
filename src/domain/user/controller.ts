import { Request, Response } from "express";
import Authentication from "utils/auth";
import UserService from "./service";

const login = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const result = await UserService.login(username, password);

		await Authentication.setCookie(res, username);

		res.status(200).json({
			success: true,
			message: result.message,
			data: { user: result.user },
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(401).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const register = async (req: Request, res: Response) => {
	try {
		const { username, password, tglLahir, kelasId } = req.body;
		const result = await UserService.register(
			username,
			password,
			tglLahir,
			kelasId
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: { user: result.user },
		});
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const logout = (req: Request, res: Response) => {
	res.clearCookie("token");
	res.status(200).json({
		success: true,
		message: "Logged out sucessfully",
	});
};

export { login, register, logout };
