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
			console.error("Error login user:", error);
			throw error;
		}
	};
	static register = async (
		username: string,
		password: string,
		tglLahir: Date,
		kelasId?: string
	) => {
		try {
			const formatTglLahir = new Date(tglLahir);
			const hashedPassword = await bcryptjs.hash(password, 10);

			const user = await UserDao.register(
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
			console.error("Error creating user:", error);
			throw new Error("Error creating user");
		}
	};
}

export default UserService;