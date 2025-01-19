import { LogType, PrismaClient } from "@prisma/client";
import { LogDTO } from "./dto";

const prisma = new PrismaClient();

class LogDao {
	static createLog = async (
		action: string,
		module: string,
		notes: string,
		type: LogType,
		tgl: Date,
		userId: string
	) => {
		try {
			const log: LogDTO = await prisma.log.create({
				data: {
					action,
					module,
					notes,
					type,
					tgl,
					userId,
				},
			});

			return log;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default LogDao;
