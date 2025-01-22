import UserService from "domain/user/service";
import AbsensiChildrenDao from "./dao";
import { SimpleAbsensiChildrenDTO } from "./dto";

class AbsensiChildrenService {
	static getAbsensiChildren = async (tgl: string, kelasId?: string) => {
		try {
			const defaultDate = new Date();
			const formatTgl = new Date(tgl || defaultDate);
			const absensiChildren = await AbsensiChildrenDao.getAbsensiChildren(
				formatTgl,
				kelasId
			);

			return {
				message: "Children's attendance retrieved successfully.",
				absensiChildren: absensiChildren.map((data) => {
					return {
						...data,
						nama: data.children.nama,
						kelas: data.kelas.nama,
						children: undefined,
					};
				}),
			};
		} catch (error) {
			console.error("Error get children's attendance: ", error);
			throw error;
		}
	};

	static storeAbsensiChildren = async (
		tgl: string,
		username: string,
		data: SimpleAbsensiChildrenDTO[]
	) => {
		try {
			const user = await UserService.getUserByUsername(username);

			if (!user) {
				throw "User not found.";
			}

			const formatTgl = new Date(tgl);
			await AbsensiChildrenDao.storeAbsensiChildren(
				formatTgl,
				user.id,
				data
			);

			const absensiChildren =
				await AbsensiChildrenDao.getAbsensiChildren(formatTgl);

			return {
				message: "Children's attendance stored successfully.",
				absensiChildren: absensiChildren.map((dataAbsen) => {
					return {
						...dataAbsen,
						nama: dataAbsen.children.nama,
						kelas: dataAbsen.kelas.nama,
						children: undefined,
					};
				}),
			};
		} catch (error) {
			console.error("Error store children's attendance: ", error);
			throw error;
		}
	};
}

export default AbsensiChildrenService;
