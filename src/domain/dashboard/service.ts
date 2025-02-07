import { Gender } from "@prisma/client";
import DashboardDao from "./dao";

class DashboardService {
	static getChildrenCount = async () => {
		try {
			const childrenTotal = await DashboardDao.countChildren();
			const boyChildCount = await DashboardDao.countChildrenByGender(
				Gender.BOY
			);
			const girlChildCount = await DashboardDao.countChildrenByGender(
				Gender.GIRL
			);

			console.log({ childrenTotal, boyChildCount, girlChildCount });

			return {
				message: "Children retrieved successfully.",
				// children,
			};
		} catch (error) {
			console.error("Error get children: ", error);
			throw error;
		}
	};
}

export default DashboardService;
