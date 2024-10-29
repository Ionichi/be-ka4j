import { PrismaClient } from "@prisma/client";
import { ChildrenDTO } from "./dto";

const prisma = new PrismaClient();

class ChildrenDao {
	static getChildren = async () => {
		try {
			const children: ChildrenDTO[] = await prisma.children.findMany();

			return children;
		} catch (error) {
			throw error;
		} finally {
			await prisma.$disconnect();
		}
	};

	static createChildren = async (
		nama: string,
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
}

export default ChildrenDao;
