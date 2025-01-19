import { Gender, PrismaClient } from "@prisma/client";
import { ChildrenDTO } from "./dto";

const prisma = new PrismaClient();

class ChildrenDao {
	static getChildren = async () => {
		try {
			const children: ChildrenDTO[] = await prisma.children.findMany({
				where: {
					isActive: true,
				},
				include: {
					kelas: {
						select: {
							nama: true,
						},
					},
				},
			});

			return children;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static getChildrenById = async (id: string) => {
		try {
			const children: ChildrenDTO | null =
				await prisma.children.findUnique({
					where: {
						id,
						isActive: true,
					},
				});

			return children;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static createChildren = async (
		nama: string,
		gender: Gender,
		tglLahir: Date,
		namaParent: string,
		kontak: string,
		isJemaat: boolean,
		kelasId: string
	) => {
		try {
			const children: ChildrenDTO = await prisma.children.create({
				data: {
					nama,
					gender,
					tglLahir,
					namaParent,
					kontak,
					isJemaat,
					kelasId,
				},
			});

			return children;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static updateChildren = async (
		id: string,
		nama: string,
		gender: Gender,
		tglLahir: Date,
		namaParent: string,
		kontak: string,
		isJemaat: boolean,
		kelasId: string
	) => {
		try {
			const children: ChildrenDTO = await prisma.children.update({
				where: {
					id,
					isActive: true,
				},
				data: {
					nama,
					gender,
					tglLahir,
					namaParent,
					kontak,
					isJemaat,
					kelasId,
				},
			});

			return children;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static softDeleteChildren = async (id: string) => {
		try {
			const children: ChildrenDTO = await prisma.children.update({
				where: {
					id,
					isActive: true,
				},
				data: {
					isActive: false,
				},
			});

			return children;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};
}

export default ChildrenDao;
