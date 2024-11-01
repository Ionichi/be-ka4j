export interface AbsensiMentorDTO {
	id: string;
	tgl: Date;
	userId: string;
	isPresent: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface DataAbsensiMentorDTO {
	id: string;
	username: string;
	AbsensiMentor: AbsensiMentorDTO[];
}

export interface SimpleAbsensiMentorDTO {
	id: string;
	username: string;
	isPresent: boolean;
}
