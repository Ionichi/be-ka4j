import { PrismaClient } from "@prisma/client";
import {
	AbsensiChildrenDTO,
	DataAbsensiChildrenDTO,
	SimpleAbsensiChildrenDTO,
} from "./dto";

const prisma = new PrismaClient();

class AbsensiChildrenDao {
	static getAbsensiChildren = async (tgl: Date) => {
		try {
			const absensiChildren: DataAbsensiChildrenDTO[] =
				await prisma.absensiChildren.findMany({
					where: {
						tgl,
					},
					include: {
						kelas: {
							select: {
								nama: true,
							},
						},
						children: {
							select: {
								nama: true,
							},
						},
					},
					orderBy: [
						{
							kelas: {
								nama: "asc",
							},
						},
						{
							children: {
								nama: "asc",
							},
						},
					],
				});

			return absensiChildren;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static storeAbsensiChildren = async (
		tgl: Date,
		userId: string,
		data: SimpleAbsensiChildrenDTO[]
	) => {
		try {
			await prisma.$transaction(async () => {
				data.forEach(async (children) => {
					const absensiChildren: AbsensiChildrenDTO | null =
						await prisma.absensiChildren.findFirst({
							where: {
								tgl,
								childrenId: children.childrenId,
							},
						});
					if (absensiChildren) {
						await prisma.absensiChildren.update({
							where: {
								id: absensiChildren.id,
							},
							data: {
								isPresent: children.isPresent,
								isDevotion: children.isDevotion,
								extras: children.extras,
								notes: children.notes,
							},
						});
					} else {
						await prisma.absensiChildren.create({
							data: {
								childrenId: children.childrenId,
								kelasId: children.kelasId,
								tgl,
								isPresent: children.isPresent,
								isDevotion: children.isDevotion,
								extras: children.extras,
								notes: children.notes,
								userId,
							},
						});
					}
				});
			});
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default AbsensiChildrenDao;
