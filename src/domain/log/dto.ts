import { LogType } from "@prisma/client";

export interface LogDTO {
	id: string;
	action: string;
	module: string;
	notes: string;
	type: LogType;
	tgl: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}
