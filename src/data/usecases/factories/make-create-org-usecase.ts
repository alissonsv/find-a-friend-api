import { PrismaOrgRepository } from "#/infra/repository/prisma/prisma-org-repository";
import { CreateOrgUseCase } from "../create-org-usecase";

export function makeCreateOrgUseCase() {
	const orgRepository = new PrismaOrgRepository();

	return new CreateOrgUseCase(orgRepository);
}
