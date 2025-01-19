import bcryptjs from "bcryptjs";
import UserDao from "./dao";

class UserService {
	static login = async (username: string, password: string) => {
		try {
			const user = await UserDao.login(username);
			if (!user) {
				throw new Error("Invalid username or password");
			}

			const isMatch = await bcryptjs.compare(password, user.password);
			if (!isMatch) {
				throw new Error("Invalid username or password");
			}

			return {
				message: "Login successfuly!",
				user: {
					...user,
					password: undefined,
				},
			};
		} catch (error) {
			console.error("Error login user: ", error);
			throw error;
		}
	};
	static createUser = async (
		username: string,
		password: string,
		tglLahir: Date,
		kelasId?: string
	) => {
		try {
			const formatTglLahir = new Date(tglLahir);
			const hashedPassword = await bcryptjs.hash(password, 10);

			const user = await UserDao.createUser(
				username,
				hashedPassword,
				formatTglLahir,
				kelasId
			);

			return {
				message: "User created successfully!",
				user: {
					...user,
					password: undefined,
				},
			};
		} catch (error) {
			console.error("Error creating user: ", error);
			throw error;
		}
	};

	static getUserByUsername = async (username: string) => {
		try {
			const result = await UserDao.getUserByUsername(username);

			return result;
		} catch (error) {
			console.error("Error getting current user by username: ", error);
			throw error;
		}
	};

	static getUserById = async (userId: string) => {
		try {
			const user = await UserDao.getUserById(userId);

			return {
				message: "User retrieved successfully.",
				user: {
					...user,
					password: undefined,
				},
			};
		} catch (error) {
			console.error("Error getting user by id: ", error);
			throw error;
		}
	};

	static getUsers = async () => {
		try {
			const users = await UserDao.getUsers();

			return {
				message: "Users retrieved successfully.",
				users: users.map((user) => {
					return {
						...user,
						password: undefined,
					};
				}),
			};
		} catch (error) {
			console.error("Error get users: ", error);
			throw error;
		}
	};

	static updateUser = async (
		id: string,
		username: string,
		password: string,
		tglLahir: Date,
		kelasId: string
	) => {
		try {
			const formatTglLahir = new Date(tglLahir);
			const hashedPassword = password
				? await bcryptjs.hash(password, 10)
				: password;

			const user = await UserDao.updateUser(
				id,
				username,
				hashedPassword,
				formatTglLahir,
				kelasId
			);

			return {
				message: "User updated successfully!",
				user: {
					...user,
					password: undefined,
				},
			};
		} catch (error) {
			console.error("Error updating user: ", error);
			throw error;
		}
	};

	static softDeleteUser = async (id: string) => {
		try {
			const user = await UserDao.softDeleteUser(id);

			return {
				message: "User deleted successfully!",
				user,
			};
		} catch (error) {
			console.error("Error deleting user: ", error);
			throw error;
		}
	};
}

export default UserService;
