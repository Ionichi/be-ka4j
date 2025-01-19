import { Gender } from "@prisma/client";

export interface ChildrenDTO {
	id: string;
	nama: string;
	gender: Gender;
	tglLahir: Date | null;
	namaParent: string | null;
	kontak: string | null;
	isJemaat: boolean;
	kelasId: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
