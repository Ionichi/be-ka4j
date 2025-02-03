interface KelasReferenceDTO {
	nama: string;
}

interface ChildrenReferenceDTO {
	nama: string;
}

export interface AbsensiChildrenDTO {
	id: string;
	childrenId: string;
	kelasId: string;
	tgl: Date;
	isPresent: boolean;
	isDevotion: boolean;
	extras: number;
	notes: string | null;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface DataAbsensiChildrenDTO {
	childrenId: string;
	kelasId: string;
	tgl: Date;
	isPresent: boolean;
	isDevotion: boolean;
	extras: number;
	notes: string | null;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	kelas: KelasReferenceDTO;
	children: ChildrenReferenceDTO;
}

export interface SimpleAbsensiChildrenDTO {
	childrenId: string;
	kelasId: string;
	isPresent: boolean;
	isDevotion: boolean;
	extras: number;
	notes: string | null;
}
