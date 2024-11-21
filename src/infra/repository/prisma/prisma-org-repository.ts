import type { Prisma, Org } from "@prisma/client";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";
import { prismaClient } from "#/lib/prisma";

export class PrismaOrgRepository implements IOrgRepository {
	async create(data: Prisma.OrgCreateInput): Promise<Org> {
		const org = await prismaClient.org.create({ data });

		return org;
	}
}
