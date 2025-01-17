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

	static register = async (
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
}

export default UserDao;
