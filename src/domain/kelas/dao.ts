import { PrismaClient } from "@prisma/client";
import { KelasDTO } from "./dto";

const prisma = new PrismaClient();

class KelasDao {
	static getKelas = async () => {
		try {
			const kelas: KelasDTO[] = await prisma.kelas.findMany({
				where: {
					isActive: true,
				},
				orderBy: [{ isActive: "desc" }, { nama: "asc" }],
			});

			return kelas;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static getKelasById = async (id: string) => {
		try {
			const kelas: KelasDTO | null = await prisma.kelas.findUnique({
				where: {
					id,
					isActive: true,
				},
			});

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

	static updateKelas = async (id: string, nama: string) => {
		try {
			const kelas: KelasDTO = await prisma.kelas.update({
				where: {
					id,
					isActive: true,
				},
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

	static softDeleteKelas = async (id: string) => {
		try {
			const kelas = await prisma.kelas.update({
				where: {
					id,
					isActive: true,
				},
				data: {
					isActive: false,
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
