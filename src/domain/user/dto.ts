export interface UserDTO {
	id: string;
	username: string;
	password: string;
	isAdmin: boolean;
	tglLahir: Date;
	kelasId: string | null;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
