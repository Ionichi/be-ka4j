import { LogType } from "@prisma/client";

class LogService {
	static logError = (
		action: string,
		module: string,
		notes: string,
		type: LogType,
		userId: string
	) => {
		try {
			console.log(action, module, notes, type, userId);
		} catch (error) {
			// this.logError("store", "LogError", error, "ERROR", userId);
			console.log(error);
		}
	};
}

export default LogService;
