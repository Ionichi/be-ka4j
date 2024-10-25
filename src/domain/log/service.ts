import { LogType } from "@prisma/client";
import UserService from "domain/user/service";
import LogDao from "./dao";

class LogService {
	static createLog = async (
		action: string,
		module: string,
		notes: string,
		type: LogType,
		username: string
	) => {
		try {
			const tgl = new Date();
			const user = await UserService.getUserByUsername(username);
			if (!user) {
				throw new Error("User not found");
			}

			const log = await LogDao.createLog(
				action,
				module,
				notes,
				type,
				tgl,
				user.id
			);

			console.log(log);
		} catch (error) {
			console.log("Error create log: ", error);
		}
	};
}

export default LogService;
