import { Gender } from "@prisma/client";
import ChildrenDao from "./dao";

class ChildrenService {
	static getChildren = async () => {
		try {
			const children = await ChildrenDao.getChildren();

			return {
				message: "Children retrieved successfully.",
				children,
			};
		} catch (error) {
			console.error("Error get children: ", error);
			throw error;
		}
	};

	static getChildrenById = async (id: string) => {
		try {
			const children = await ChildrenDao.getChildrenById(id);

			return {
				message: "Children retrieved successfully.",
				children,
			};
		} catch (error) {
			console.error("Error get children by id: ", error);
			throw error;
		}
	};

	static createChildren = async (
		nama: string,
		gender: string,
		tglLahir: Date,
		namaParent: string,
		kontak: string,
		isJemaat: boolean,
		kelasId: string
	) => {
		try {
			const formatTglLahir = new Date(tglLahir);
			const genderType: Gender =
				gender.toUpperCase() === "P" || gender.toUpperCase() === "GIRL"
					? Gender.GIRL
					: Gender.BOY;

			const children = await ChildrenDao.createChildren(
				nama,
				genderType,
				formatTglLahir,
				namaParent,
				kontak,
				isJemaat,
				kelasId
			);

			return {
				message: "Children created successfully!",
				children,
			};
		} catch (error) {
			console.error("Error create children: ", error);
			throw error;
		}
	};

	static updateChildren = async (
		id: string,
		nama: string,
		gender: string,
		tglLahir: Date,
		namaParent: string,
		kontak: string,
		isJemaat: boolean,
		kelasId: string
	) => {
		try {
			const formatTglLahir = new Date(tglLahir);
			const genderType: Gender =
				gender.toUpperCase() === "P" || gender.toUpperCase() === "GIRL"
					? Gender.GIRL
					: Gender.BOY;

			const children = await ChildrenDao.updateChildren(
				id,
				nama,
				genderType,
				formatTglLahir,
				namaParent,
				kontak,
				isJemaat,
				kelasId
			);

			return {
				message: "Children updated successfully!",
				children,
			};
		} catch (error) {
			console.error("Error update children: ", error);
			throw error;
		}
	};
}

export default ChildrenService;
