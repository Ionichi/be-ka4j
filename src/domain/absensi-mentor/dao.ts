import { PrismaClient } from "@prisma/client";
import { DataAbsensiMentorDTO, SimpleAbsensiMentorDTO } from "./dto";

const prisma = new PrismaClient();

class AbsensiMentorDao {
	static getAbsensiMentor = async (tgl: Date) => {
		try {
			const absensiMentor: DataAbsensiMentorDTO[] =
				await prisma.user.findMany({
					where: {
						isAdmin: false,
						isActive: true,
					},
					select: {
						id: true,
						username: true,
						AbsensiMentor: {
							where: {
								tgl,
							},
						},
					},
				});

			return absensiMentor;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static storeAbsensiMentor = async (
		tgl: Date,
		data: SimpleAbsensiMentorDTO[]
	) => {
		try {
			console.table(data);
			const queries = data.map((user) => {
				return prisma.absensiMentor.upsert({
					where: {
						userId_tgl: {
							userId: user.id,
							tgl,
						},
					},
					update: {
						isPresent: user.isPresent,
					},
					create: {
						userId: user.id,
						tgl,
						isPresent: user.isPresent,
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

export default AbsensiMentorDao;
