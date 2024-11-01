import { PrismaClient } from "@prisma/client";
import {
	AbsensiMentorDTO,
	DataAbsensiMentorDTO,
	SimpleAbsensiMentorDTO,
} from "./dto";

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
			await prisma.$transaction(async () => {
				data.forEach(async (user) => {
					const absensiMentor: AbsensiMentorDTO | null =
						await prisma.absensiMentor.findFirst({
							where: {
								tgl,
								userId: user.id,
							},
						});
					if (absensiMentor) {
						await prisma.absensiMentor.update({
							where: {
								id: absensiMentor.id,
							},
							data: {
								isPresent: user.isPresent,
							},
						});
					} else {
						await prisma.absensiMentor.create({
							data: {
								userId: user.id,
								isPresent: user.isPresent,
								tgl,
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

export default AbsensiMentorDao;
