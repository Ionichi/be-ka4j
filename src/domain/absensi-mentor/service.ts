import AbsensiMentorDao from "./dao";
import { SimpleAbsensiMentorDTO } from "./dto";

class AbsensiMentorService {
	static getAbsensiMentor = async (tgl: string) => {
		try {
			const defaultDate = new Date();
			const formatTgl = new Date(tgl || defaultDate);
			const absensiMentor =
				await AbsensiMentorDao.getAbsensiMentor(formatTgl);

			return {
				message: "Teacher's attendance retrieved successfully.",
				absensiMentor: absensiMentor.map((data) => {
					return {
						...data,
						AbsensiMentor: undefined,
						isPresent:
							data.AbsensiMentor.length === 1 &&
							data.AbsensiMentor[0]?.isPresent,
					};
				}),
			};
		} catch (error) {
			console.error("Error get mentor attendance: ", error);
			throw error;
		}
	};

	static storeAbsensiMentor = async (
		tgl: string,
		data: SimpleAbsensiMentorDTO[]
	) => {
		try {
			const formatTgl = new Date(tgl);
			await AbsensiMentorDao.storeAbsensiMentor(formatTgl, data);

			const absensiMentor =
				await AbsensiMentorDao.getAbsensiMentor(formatTgl);

			return {
				message: "Teacher's attendance stored successfully.",
				absensiMentor: absensiMentor.map((dataAbsen) => {
					return {
						...dataAbsen,
						AbsensiMentor: undefined,
						isPresent:
							dataAbsen.AbsensiMentor.length === 1 &&
							dataAbsen.AbsensiMentor[0]?.isPresent,
					};
				}),
			};
		} catch (error) {
			console.error("Error store mentor attendance: ", error);
			throw error;
		}
	};
}

export default AbsensiMentorService;
