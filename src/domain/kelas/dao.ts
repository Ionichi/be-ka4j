import { PrismaClient } from "@prisma/client";
import { KelasDTO } from "./dto";

const prisma = new PrismaClient();

class KelasDao {
	static getKelas = async () => {
		try {
			const kelas: KelasDTO[] = await prisma.kelas.findMany();

			return kelas;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static createKelas = async (nama: string) => {
		try {
			const kelas: KelasDTO = await prisma.kelas.create({
				data: {
					nama,
				},
			});

			return kelas;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default KelasDao;
