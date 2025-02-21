import UserService from "domain/user/service";
import SeasonDao from "./dao";

class SeasonService {
	static getSeason = async () => {
		try {
			const season = await SeasonDao.getSeason();

			return {
				message: "Season history retrieved successfully.",
				season,
			};
		} catch (error) {
			console.error("Error get season history: ", error);
			throw error;
		}
	};

	static getLatestSeason = async () => {
		try {
			const season = await SeasonDao.getLatestSeason();

			return {
				message: "Latest season retrieved successfully.",
				season,
			};
		} catch (error) {
			console.error("Error get latest season: ", error);
			throw error;
		}
	};

	static createSeason = async (tgl: Date, username: string) => {
		try {
			const user = await UserService.getUserByUsername(username);

			if (!user) {
				throw "User not found.";
			}

			const formatTgl = new Date(tgl);
			const season = await SeasonDao.createSeason(formatTgl, user.id);

			return {
				message: "Season created successfully!",
				season,
			};
		} catch (error) {
			console.error("Error creating season: ", error);
			throw error;
		}
	};

	static deleteSeason = async (id: string) => {
		try {
			const season = await SeasonDao.deleteSeason(id);

			return {
				message: "Season deleted successfully!",
				season,
			};
		} catch (error) {
			console.error("Error deleting season: ", error);
			throw error;
		}
	};
}

export default SeasonService;
