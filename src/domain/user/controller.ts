import { Request, Response } from "express";
import Authentication from "utils/auth";
import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
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

const createUser = async (req: Request, res: Response) => {
	try {
		const { username, password, tglLahir, kelasId } = req.body;
		const result = await UserService.createUser(
			username,
			password,
			tglLahir,
			kelasId
		);

		await LogService.createLog(
			"save",
			"create user",
			`create user ${username}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: { user: result.user },
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"save",
				"create user",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
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

const getUserByUsername = async (req: Request, res: Response) => {
	try {
		const { currentUsername } = req.body;
		const user = await UserService.getUserByUsername(currentUsername);

		if (!user) {
			throw new Error("Unuthorized user!");
		}

		res.status(200).json({
			success: true,
			message: "-",
			data: {
				user: {
					...user,
					password: undefined,
				},
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get current user",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const getUserById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await UserService.getUserById(id);

		if (!result.user) {
			throw new Error("Unuthorized user!");
		}

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				user: result.user,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get user by id",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const getUsers = async (req: Request, res: Response) => {
	try {
		const result = await UserService.getUsers();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				users: result.users,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get all user",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { username, password, tglLahir, kelasId } = req.body;
		const result = await UserService.updateUser(
			id,
			username,
			password,
			tglLahir,
			kelasId
		);

		await LogService.createLog(
			"update",
			"update user",
			`update user ${username}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				user: result.user,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"update",
				"update user",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const softDeleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await UserService.softDeleteUser(id);

		await LogService.createLog(
			"delete",
			"delete user",
			`delete user ${result.user.username}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				user: result.user,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"delete",
				"delete user",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

export {
	login,
	createUser,
	logout,
	getUserByUsername,
	getUserById,
	getUsers,
	updateUser,
	softDeleteUser,
};
