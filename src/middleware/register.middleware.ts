import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

const validateRegister = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { username, password, tglLahir } = req.body;

		if (!username || !tglLahir) {
			throw new Error("Username, birth fields are required");
		}
		if (!id && !password) {
			throw new Error("Password field is required");
		}

		if (
			(!id && password.length < 6) ||
			(id && password && password.length < 6)
		) {
			throw new Error("Password must be at least 6 characters long");
		}

		const user = await prisma.user.findUnique({
			where: {
				username,
				isActive: true,
			},
		});
		if (!id && user) {
			throw new Error("Username is already taken");
		}

		next();
	} catch (error) {
		if (error instanceof Error) {
			res.status(422).json({
				success: false,
				message: error.message,
			});
		}
	} finally {
		await prisma.$disconnect();
	}
};

export default validateRegister;
