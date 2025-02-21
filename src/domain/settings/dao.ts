import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SeasonDTO } from "./dto";

const prisma = new PrismaClient();

class SeasonDao {
	static getSeason = async () => {
		try {
			const season: SeasonDTO[] = await prisma.season.findMany({
				orderBy: { tgl: "desc" },
			});

			return season;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static getLatestSeason = async () => {
		try {
			const season: SeasonDTO | null = await prisma.season.findFirst({
				orderBy: { tgl: "desc" },
			});

			return season;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static createSeason = async (tgl: Date, userId: string) => {
		try {
			const season: SeasonDTO = await prisma.season.create({
				data: {
					tgl,
					userId,
				},
			});

			return season;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static deleteSeason = async (id: string) => {
		try {
			const season: SeasonDTO = await prisma.season.delete({
				where: {
					id,
				},
			});

			return season;
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2025"
			) {
				throw new Error("Season not found.");
			}

			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default SeasonDao;
