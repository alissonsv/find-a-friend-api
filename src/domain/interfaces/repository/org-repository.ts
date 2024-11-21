import type { Org, Prisma } from "@prisma/client";

export interface IOrgRepository {
	create: (data: Prisma.OrgCreateInput) => Promise<Org>;
}