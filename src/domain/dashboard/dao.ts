import { Gender, PrismaClient } from "@prisma/client";
import { AbsensiChildrenDTO } from "domain/absensi-children/dto";

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

	static countClass = async () => {
		try {
			const classCount: number = await prisma.kelas.count({
				where: {
					isActive: true,
				},
			});

			return classCount;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static countTotalCoupon = async () => {
		try {
			const absensiChildren: AbsensiChildrenDTO[] =
				await prisma.absensiChildren.findMany({
					where: {
						tgl: {
							gt: new Date("2024-01-01"),
						},
					},
				});

			const totalCoupon = absensiChildren.reduce(
				(total, data) =>
					total +
					((data.isPresent && 1) as number) +
					((data.isDevotion && 1) as number) +
					data.extras,
				0
			);

			return totalCoupon;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default DashboardDao;
