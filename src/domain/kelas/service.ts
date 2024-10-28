import KelasDao from "./dao";

class KelasService {
	static getKelas = async () => {
		try {
			const kelas = await KelasDao.getKelas();

			return kelas;
		} catch (error) {
			console.error("Error get kelas: ", error);
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
}

export default KelasService;
