import { PrismaClient } from "@prisma/client";
import { UserDTO } from "./dto";

const prisma = new PrismaClient();

class UserDao {
	static login = async (username: string) => {
		try {
			const user: UserDTO | null = await prisma.user.findUnique({
				where: {
					username,
					isActive: true,
				},
			});

			return user;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static createUser = async (
		username: string,
		password: string,
		tglLahir: Date,
		kelasId?: string
	) => {
		try {
			const user: UserDTO = await prisma.user.create({
				data: {
					username,
					password,
					tglLahir,
					kelasId: kelasId || undefined,
				},
			});

			return user;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static getUserByUsername = async (username: string) => {
		try {
			const user: UserDTO | null = await prisma.user.findUnique({
				where: {
					username,
					isActive: true,
				},
			});

			return user;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static getUserById = async (id: string) => {
		try {
			const user: UserDTO | null = await prisma.user.findUnique({
				where: {
					id,
					isActive: true,
				},
			});

			return user;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static getUsers = async () => {
		try {
			const users: UserDTO[] | null = await prisma.user.findMany({
				where: {
					isAdmin: false,
				},
				orderBy: {
					isActive: "desc",
				},
				include: {
					kelas: {
						select: {
							nama: true,
						},
					},
				},
			});

			return users;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static updateUser = async (
		id: string,
		username: string,
		password: string,
		tglLahir: Date,
		kelasId?: string
	) => {
		try {
			const user: UserDTO = await prisma.user.update({
				where: {
					id,
					username,
					isActive: true,
				},
				data: {
					password: password || undefined,
					tglLahir,
					kelasId,
				},
			});

			return user;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static softDeleteUser = async (id: string) => {
		try {
			const user: UserDTO | null = await prisma.user.findUnique({
				where: {
					id,
				},
			});

			if (!user) {
				throw new Error("User not found");
			}

			const updateUser: UserDTO = await prisma.user.update({
				where: {
					id,
				},
				data: {
					isActive: !user.isActive,
				},
			});

			return updateUser;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default UserDao;
