import { Gender } from "@prisma/client";
import DashboardDao from "./dao";

class DashboardService {
	static getDataDashboard = async () => {
		try {
			const childrenTotal = await DashboardDao.countChildren();
			const boyChildCount = await DashboardDao.countChildrenByGender(
				Gender.BOY
			);
			const girlChildCount = await DashboardDao.countChildrenByGender(
				Gender.GIRL
			);
			const classTotal = await DashboardDao.countClass();
			const absensiChildren = await DashboardDao.countTotalCoupon();

			return {
				message: "Children retrieved successfully.",
				dataCount: {
					classTotal,
					childrenTotal,
					boyChildCount,
					girlChildCount,
					absensiChildren,
				},
			};
		} catch (error) {
			console.error("Error get children: ", error);
			throw error;
		}
	};
}

export default DashboardService;
