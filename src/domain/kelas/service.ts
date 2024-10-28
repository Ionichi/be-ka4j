import KelasDao from "./dao";

class KelasService {
	static getKelas = async () => {
		try {
			const kelas = await KelasDao.getKelas();

			return {
				message: "Kelas retrieved successfully.",
				kelas,
			};
		} catch (error) {
			console.error("Error get kelas: ", error);
			throw error;
		}
	};

	static getKelasById = async (id: string) => {
		try {
			const kelas = await KelasDao.getKelasById(id);

			return {
				message: "Kelas retrieved successfully.",
				kelas,
			};
		} catch (error) {
			console.log("Error get kelas by id: ", error);
			throw error;
		}
	};

	static createKelas = async (nama: string) => {
		try {
			const kelas = await KelasDao.createKelas(nama);

			return {
				message: "Kelas created successfully!",
				kelas,
			};
		} catch (error) {
			console.error("Error creating kelas: ", error);
			throw error;
		}
	};

	static updateKelas = async (id: string, nama: string) => {
		try {
			const kelas = await KelasDao.updateKelas(id, nama);

			return {
				message: "Kelas updated successfully!",
				kelas,
			};
		} catch (error) {
			console.log("Error updating kelas: ", error);
			throw error;
		}
	};
}

export default KelasService;
