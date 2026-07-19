import { PrismaClient } from "@prisma/client";
import { DataAbsensiChildrenDTO, SimpleAbsensiChildrenDTO } from "./dto";

const prisma = new PrismaClient();

class AbsensiChildrenDao {
	static getAbsensiChildren = async (tgl: Date, kelasId?: string) => {
		try {
			const absensiChildren: DataAbsensiChildrenDTO[] =
				await prisma.absensiChildren.findMany({
					where: {
						tgl,
						kelasId,
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
			const queries = data.map((children) => {
				return prisma.absensiChildren.upsert({
					where: {
						childrenId_tgl: {
							childrenId: children.childrenId,
							tgl,
						},
					},
					update: {
						isPresent: children.isPresent,
						isDevotion: children.isDevotion,
						extras: children.extras,
						notes: children.notes,
					},
					create: {
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
			});

			await prisma.$transaction(queries);
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default AbsensiChildrenDao;
