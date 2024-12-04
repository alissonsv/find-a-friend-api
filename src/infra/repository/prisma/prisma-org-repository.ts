import type { Org, Prisma } from "@prisma/client";
import type { IOrgRepository } from "#/domain/interfaces/repository/org-repository";
import { prismaClient } from "#/lib/prisma";

export class PrismaOrgRepository implements IOrgRepository {
	async create(data: Prisma.OrgCreateInput): Promise<Org> {
		const org = await prismaClient.org.create({ data });

		return org;
	}

	async findByEmail(email: string): Promise<Org | null> {
		return prismaClient.org.findUnique({ where: { email } });
	}
}
