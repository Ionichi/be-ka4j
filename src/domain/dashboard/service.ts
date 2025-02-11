import { Gender } from "@prisma/client";
import DashboardDao from "./dao";

class DashboardService {
	static getDataDashboard = async () => {
		try {
			const totalChildren = await DashboardDao.countChildren();
			const totalBoyChildren = await DashboardDao.countChildrenByGender(
				Gender.BOY
			);
			const totalGirlChildren = await DashboardDao.countChildrenByGender(
				Gender.GIRL
			);
			const totalClass = await DashboardDao.countClass();
			const totalCoupon = await DashboardDao.countTotalCoupon();

			return {
				message: "Data dashboard retrieved successfully.",
				dataCount: {
					totalClass,
					totalChildren,
					totalBoyChildren,
					totalGirlChildren,
					totalCoupon,
				},
			};
		} catch (error) {
			console.error("Error get data dashboard: ", error);
			throw error;
		}
	};
}

export default DashboardService;
