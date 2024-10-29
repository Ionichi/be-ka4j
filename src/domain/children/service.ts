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

	static createChildren = async (
		nama: string,
		tglLahir: Date,
		namaParent: string,
		kontak: string,
		isJemaat: boolean,
		kelasId: string
	) => {
		try {
			const formatTglLahir = new Date(tglLahir);

			const children = await ChildrenDao.createChildren(
				nama,
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
}

export default ChildrenService;
