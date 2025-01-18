import { PrismaOrgRepository } from "#/infra/repository/prisma/prisma-org-repository";
import { AuthenticateUseCase } from "../authenticate-usecase";

export function makeAuthenticateUseCase() {
	const orgRepository = new PrismaOrgRepository();

	return new AuthenticateUseCase(orgRepository);
}
