import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DashboardDao {
	static countChildren = async () => {
		try {
			const childrenCount: number = await prisma.children.count({
				where: {
					isActive: true,
				},
			});

			return childrenCount;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static countChildrenByGender = async (gender: Gender) => {
		try {
			const childrenCount: number = await prisma.children.count({
				where: {
					gender,
					isActive: true,
				},
			});

			return childrenCount;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default DashboardDao;
